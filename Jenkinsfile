pipeline {
    agent any
    environment {
        DOCKER_IMAGE_NAME = "elelngelina/todo-list-app"
        DOCKERHUB_CREDENTIALS_ID = "dockerhub-creds"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker login -u %DOCKER_IMAGE_NAME:0% -p %DOCKERHUB_CREDENTIALS_ID% registry.hub.docker.com"
                
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
