import React from 'react';

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            subscribers: [],
            launched: false,
            context: ''
        }
        this.publishContext();
        const app = fin.desktop.Application.getCurrent();
        app.addEventListener('run-requested', (event) => {
            console.log('run-requested');
            console.log(event);
            this.setState({
                context: this.getContext(event.userAppConfigArgs)
            })
            this.publishContext();
        });
    }

    componentDidMount() {
        this.setState({
            context: this.getContext(window.location.search)
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
        console.log(queryParamsString);
        if (this.state.launched === false) {
            if (queryParamsString[0] === '?') {
                queryParamsString = queryParamsString.substr(1);
            }

            let objArray = queryParamsString.split('=');
            console.log(objArray)

            if (objArray[1][0] === '$') {
                objArray[1] = objArray[1].substr(1);
            }
            this.setState({
                launched: true
            })
            return objArray[1];
        } else {
            const currentContext = this.state.context;

            if (queryParamsString[0] === '?') {
                queryParamsString = queryParamsString.substr(1);
            }

            let objArray = queryParamsString.split('=');
            let word = objArray[1];
            if (word[0] === '$') {
                word = word.substr(1)
            }
            console.log('LAUNCH TEST')
            console.log(word)
            console.log(word.slice(0,5))
            if (word.slice(0,5) === 'launch') {
                let appName = word.split('-')[1]
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
                console.log('returning current context')
                console.log(currentContext);
                return currentContext;
            } else {
                console.log('else return word')
                console.log(word)
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
