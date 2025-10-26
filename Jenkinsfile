pipeline {
    agent any 
    
    tools {
        dockerTool 'Default' 
    }
    
    environment {
        DOCKER_IMAGE_NAME = "elvinapraktikum/todo-list-app" 
        DOCKERHUB_CREDENTIALS_ID = "dockerhub-creds" 
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo 'Kode sudah di-checkout.'
            }
        }
        
        stage('Build and Push to DockerHub') {
            steps {
                script {
                    echo "Membangun image Docker: ${DOCKER_IMAGE_NAME}"
                    
                    def dockerImage = docker.build(DOCKER_IMAGE_NAME)

                    echo "Pushing image ke DockerHub..."
                    
                    docker.withRegistry('https://registry.hub.docker.com', DOCKERHUB_CREDENTIALS_ID) {
                        
                        dockerImage.push('latest')
                        
                    }
                    echo "Image berhasil di-push ke DockerHub."
                }
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline selesai.'
            cleanWs()
        }
    }
}


