pipeline {

	agent any

	tools {
		nodejs "node 10.15.3"
	}

	stages {

		stage('Install dependencies') {
			steps {
                sh 'npm install'
			}
		}

		stage('Test') {
			steps {
				sh 'npm run clear_jest'
				sh 'npm run test'
			}
		}

		stage('Static Code Analysis') {
			environment {
				scannerHome = tool 'SonarQubeScanner'
			}
			steps {
				withSonarQubeEnv('sonar-pratech') {
				sh "${scannerHome}/bin/sonar-scanner"
			    }
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
			}
		}

		stage('Build') {
			steps {
                sh 'npm run grunt'
			}
		}

		stage('Deploy') {
			steps {
				timeout(time: 10, unit: 'MINUTES') {
					pushToCloudFoundry(
						target: 'api.us-east.bluemix.net',
						pluginTimeout: "600",
						organization: 'GRUPO_KONECTA_APP_P',
						cloudSpace: 'ETB_QA',
						credentialsId: 'cloudfoundry',
						manifestChoice: [manifestFile: 'manifest-qa.yml']
					)
				}
			}
		}

		// stage('Publish Artifacts') {
			
		// 	steps {
		// 		dir('konecta-chatbot-services-sura-pac') { 
		// 			zip zipFile: "dist_${env.BUILD_NUMBER}.zip", archive: false, glob: 'dist/**'
		// 			archiveArtifacts artifacts: "dist_${env.BUILD_NUMBER}.zip", fingerprint: true
		// 			sh 'ls'
		// 			rtUpload (serverId: 'artifactory_pratech',
		// 			spec: """{"files": [{"pattern": "dist*.zip", "target": "pratech-repositories/proyectos/konecta/sura-pac/${env.BUILD_NUMBER}/"}]}""",
		// 			buildNumber: "${env.BUILD_NUMBER}"
		// 			)
		// 		}
		// 	}
		// }

	}

	post {
        always {
            echo 'One way or another, I have finished'
            cleanWs()
        }
        success {
            echo 'I succeeeded!'
			emailext body: 'Ejecución exitosa', 
			recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
			subject: 'Ejecución exitosa.',
			to: 'josorio@pratechgroup.com'
        }
        unstable {
            echo 'I am unstable :/'
        }
        failure {
            emailext body: 'Ejecución fallida', 
			recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
			subject: 'Ejecución fallida.',
			to: 'josorio@pratechgroup.com'
        }
        changed {
            echo 'Things were different before...'
        }
    }

}
