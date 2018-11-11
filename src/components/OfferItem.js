import React from 'react';
import * as semantic from 'semantic-ui-react';

export default ({ offer }) => {
    return (
        <semantic.Table.Row>
            <semantic.Table.Cell>{offer.company_name}</semantic.Table.Cell>
            <semantic.Table.Cell>{offer.base_salary}</semantic.Table.Cell>
            <semantic.Table.Cell>{offer.equity}</semantic.Table.Cell>
            <semantic.Table.Cell>{offer.sign_bonus_string}</semantic.Table.Cell>
            <semantic.Table.Cell>{offer.yearly_bonus}</semantic.Table.Cell>
        </semantic.Table.Row>
    );
};
