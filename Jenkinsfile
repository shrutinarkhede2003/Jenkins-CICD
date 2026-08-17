pipeline {
    agent any

    environment {
        DOCKER_PATH = '"C:\\Users\\Shruti Narkhede\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe"'
        APP_NAME = 'jenkins-cicd-app'
        CONTAINER_NAME = 'jenkins-cicd-container'
    }

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

        stage('Lint & Code Check') {
            steps {
                bat 'npm run lint'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                bat '%DOCKER_PATH% build -t %APP_NAME% .'
            }
        }

        stage('Deploy Container') {
            steps {
                bat '%DOCKER_PATH% stop %CONTAINER_NAME% || exit /b 0'
                bat '%DOCKER_PATH% rm %CONTAINER_NAME% || exit /b 0'
                bat '%DOCKER_PATH% run -d -p 3000:3000 --name %CONTAINER_NAME% %APP_NAME%'
            }
        }
    }

    post {
        success {
            echo "Pipeline executed successfully! Application deployed on port 3000."
        }
        failure {
            echo "Pipeline failed. Please inspect build logs."
        }
        always {
            echo "Cleaning up transient build resources..."
        }
    }
}