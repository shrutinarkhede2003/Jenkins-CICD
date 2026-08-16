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
        bat '"C:\\Users\\Shruti Narkhede\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" build -t jenkins-cicd-app .'
    }
}
        stage('Deploy') {
    steps {
        bat '"C:\\Users\\Shruti Narkhede\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" stop jenkins-cicd-container || exit /b 0'
        bat '"C:\\Users\\Shruti Narkhede\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" rm jenkins-cicd-container || exit /b 0'
        bat '"C:\\Users\\Shruti Narkhede\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" run -d -p 3000:3000 --name jenkins-cicd-container jenkins-cicd-app'
    }
}
    }
}