import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Counter } from './Counter';

export class Test extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>test</div>;
    }
}
