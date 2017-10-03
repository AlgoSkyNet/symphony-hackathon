import React from 'react';

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            subscribers: [],
            context: this.getContext(window.location.search)
        }
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
                resolve(listentingApps);
            })
        })
    }

    publishContext() {
        this.getRunningApplications().then((appsArray) => {
            appsArray.forEach(app => {
                fin.desktop.InterApplicationBus.send(app.uuid, 'context', this.state.context)
                console.log(app.uuid);
            })
        })
    }

    getContext(queryParamsString) {
        if (queryParamsString[0] === '?') {
            queryParamsString = queryParamsString.substr(1);
        }

        let objArrary = queryParamsString.split('=');
        return objArrary[1];
    }

    render() {
        return (
            <div>Current Context: {this.state.context} </div>
        )
    }
}
