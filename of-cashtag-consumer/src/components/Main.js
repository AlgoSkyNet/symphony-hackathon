import React from 'react';

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            subscribers: [],
            launched: false,
            context: ''
        }
        this.setState({
            context: this.getContext(window.location.search)
        });
        this.publishContext();
        const app = fin.desktop.Application.getCurrent();
        app.addEventListener('run-requested', (event) => {
            this.setState({
                context: this.getContext(event.userAppConfigArgs)
            })
            this.publishContext();
        });
    }

    getRunningApplications() {
        return new Promise((resolve) => {
            fin.desktop.System.getAllApplications(apps => {
                let listentingApps = [];
                apps.forEach(app => {
                    if (app.isRunning) {
                        listentingApps.push(app.uuid);
                    }
                })
                console.log('Im in the PROMISE')
                console.log(listentingApps);
                resolve(listentingApps);
            })
        })
    }

    publishContext() {
        this.getRunningApplications().then((appsArray) => {
            appsArray.forEach(app => {
                fin.desktop.InterApplicationBus.send(app, 'context', this.state.context)
                console.log(app);
            })
        })
    }

    getContext(queryParamsString) {
        if (this.state.launched === false) {
            if (queryParamsString[0] === '?') {
                queryParamsString = queryParamsString.substr(1);
            }
            if (queryParamsString[0] === '$') {
                queryParamsString = queryParamsString.substr(1);
            }

            let objArrary = queryParamsString.split('=');
            console.log(objArray);
            let word = objArray[1];
            this.setState({
                launched: true
            })
            // let word = 'hello'
            return word;
        } else {
            const currentContext = this.state.context;

            if (queryParamsString[0] === '?') {
                queryParamsString = queryParamsString.substr(1);
            }
            if (queryParamsString[0] === '$') {
                queryParamsString = queryParamsString.substr(1);
            }

            let objArrary = queryParamsString.split('=');
            let word = objArray[1];
            if (word.slice(0,5) === 'launch') {
                let appName = word.substr(7, (word.length - 1))
                console.log('appName ' + appName);
                const newApp = new fin.desktop.Application({
                    name: appName,
                    url: 'https://openfin.github.io/symphony-hackathon/' + appName + '/index.html',
                    uuid: appName,
                    mainWindowOptions: {
                        defaultHeight: 600,
                        defaultWidth: 800,
                        defaultTop: 300,
                        defaultLeft: 300,
                        autoShow: true
                    }
                },
                () => { newApp.run() })
                return currentContext;
            } else {
                return word;
            }
        }
    }

    render() {
        return (
            <div>Current Context: {this.state.context} </div>
        )
    }
}
