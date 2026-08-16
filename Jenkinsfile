pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t jenkins-cicd-app .'
            }
        }

        stage('Deploy') {
            steps {
                bat 'docker stop jenkins-cicd-container || exit /b 0'
                bat 'docker rm jenkins-cicd-container || exit /b 0'
                bat 'docker run -d -p 3000:3000 --name jenkins-cicd-container jenkins-cicd-app'
            }
        }
    }
}