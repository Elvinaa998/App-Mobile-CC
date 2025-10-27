pipeline {
    agent any
    environment {
        DOCKER_USER = "elelngelina" 
        DOCKERHUB_CREDENTIALS_ID = "dockerhub-creds"
        DOCKER_IMAGE_NAME = "elelngelina/todo-list-app"
        GIT_COMMIT_SHORT = "manual" 
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
                script {
                    try {
                        def shortCommit = bat(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
                        env.GIT_COMMIT_SHORT = shortCommit
                    } catch (e) {
                        echo "Warning: Failed to get git commit ID. Using default tag 'manual'."
                        env.GIT_COMMIT_SHORT = "manual"
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS_ID, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    bat "echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin"
                }
                
                bat "docker build -t %DOCKER_IMAGE_NAME%:%GIT_COMMIT_SHORT% -t %DOCKER_IMAGE_NAME%:latest ."
            }
        }

        stage('Push to DockerHub') {
            steps {
                bat "docker push %DOCKER_IMAGE_NAME%:latest"
                bat "docker push %DOCKER_IMAGE_NAME%:%GIT_COMMIT_SHORT%"
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
