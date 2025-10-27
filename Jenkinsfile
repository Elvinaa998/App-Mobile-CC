pipeline {
    agent any
    environment {
        DOCKER_USER = "elelngelina" 
        DOCKERHUB_CREDENTIALS_ID = "dockerhub-creds"
        DOCKER_IMAGE_NAME = "elelngelina/todo-list-app" 
        GIT_COMMIT = bat(returnStdout: true, script: 'git rev-parse --short HEAD').trim() 
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS_ID, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    bat "echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin"
                }
                
                bat "docker build -t %DOCKER_IMAGE_NAME%:%GIT_COMMIT% -t %DOCKER_IMAGE_NAME%:latest ."
            }
        }

        stage('Push to DockerHub') {
            steps {
                bat "docker push %DOCKER_IMAGE_NAME%:latest"
                bat "docker push %DOCKER_IMAGE_NAME%:%GIT_COMMIT%"
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
