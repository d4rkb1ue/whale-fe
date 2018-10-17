import React from 'react';
import * as semantic from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const Offer = props => {
    return (
        <semantic.Table.Row key={props.key}>
            <semantic.Table.Cell>{props.companyName}</semantic.Table.Cell>
            <semantic.Table.Cell>{props.base}</semantic.Table.Cell>
            <semantic.Table.Cell>{props.equity}</semantic.Table.Cell>
            <semantic.Table.Cell>{props.signBonus}</semantic.Table.Cell>
            <semantic.Table.Cell>{props.yearlyBonus}</semantic.Table.Cell>
        </semantic.Table.Row>
    );
};

export default Offer;
