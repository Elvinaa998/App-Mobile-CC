pipeline {
    agent any
    environment {
        EAS_TOKEN = credentials('eas-token')
        EAS_BUILD_COMMAND = "eas build --platform android --non-interactive --wait"
        EAS_DOWNLOAD_COMMAND = "eas build:download --platform android --output=./app-release.apk"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Build APK with EAS') {
            steps {
                bat "docker run --rm -v \"${env.WORKSPACE}\":/app -w /app -e EAS_TOKEN=\"${EAS_TOKEN}\" node:20-alpine sh -c \"npm install -g eas-cli && npm install --no-package-lock && ${EAS_BUILD_COMMAND}\""
                
            }
        }

        stage('Download APK') {
            steps {
                bat "docker run --rm -v \"${env.WORKSPACE}\":/app -w /app -e EAS_TOKEN=\"${EAS_TOKEN}\" node:20-alpine sh -c \"npm install -g eas-cli && ${EAS_DOWNLOAD_COMMAND}\""
            }
        }

        stage('Archive Artifact') {
            steps {
                archiveArtifacts artifacts: 'app-release.apk', onlyIfSuccessful: true
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
