pipeline {
    agent any
    
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
                bat 'docker run --rm -v "%CD%":/app -w /app node:20-alpine npm install --no-package-lock'
            }
        }
        
        stage('Build APK with EAS') {
            steps {
                withCredentials([string(credentialsId: EAS_CREDENTIALS_ID, variable: 'EAS_TOKEN')]) {
                    bat '''
                        docker run --rm -v "%CD%":/app -w /app -e EAS_TOKEN=%EAS_TOKEN% node:20-alpine sh -c "npm install -g eas-cli && eas build --platform android --non-interactive --wait --output=./app-release.apk"
                    '''
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

