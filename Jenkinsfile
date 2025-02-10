pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building the React project...'
            }
        }
    }
    post {
        always {
            echo 'Build stage completed.'
        }
        failure {
            echo 'Build failed.'
        }
        success {
            echo 'Build succeeded!'
        }
    }
}
