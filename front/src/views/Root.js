import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import MainTemplate from '../templates/MainTemplate';
import Articles from './Articles';
import Twitters from './Twitters';
import Notes from './Notes';
import DetailPage from './DetailPage';
import { routes } from '../routes';
import store from '../store';
import Login from './Login';

const {
    home,
    notes,
    note,
    twitters,
    twitter,
    articles,
    article,
    login,
    registration,
} = routes;

const Root = () =>
    <Provider store={store}>
        <BrowserRouter>
            <MainTemplate>
                <Switch>
                    <Route exact path={login} component={Login} />
                    <Route exact path={registration} render={() => <Login isRegistration />} />

                    <Route exact path={home} render={() => <Redirect to={notes} />} />

                    <Route exact path={notes} component={Notes}/>
                    <Route path={note} component={DetailPage}/>

                    <Route exact path={articles} component={Articles}/>
                    <Route path={article} component={DetailPage}/>

                    <Route exact path={twitters} component={Twitters}/>
                    <Route path={twitter} component={DetailPage}/>
                </Switch>
            </MainTemplate>
        </BrowserRouter>
    </Provider>;

export default Root;
