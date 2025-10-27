pipeline {
    agent {
        docker { image 'node:20-alpine' }
    }
    
    environment {
        EAS_CREDENTIALS_ID = "eas-token" 
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Build APK with EAS') {
            steps {
                script {
                    sh 'npm install -g eas-cli'
                    withCredentials([string(credentialsId: EAS_CREDENTIALS_ID, variable: 'EAS_TOKEN')]) {
                        sh 'eas login --token $EAS_TOKEN'
                    }
                    sh 'eas build --platform android --non-interactive --wait --output=./app-release.apk'
                }
            }
        }

        stage('Archive APK') {
            steps {
                archiveArtifacts artifacts: 'app-release.apk', allowEmptyArchive: true
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}

