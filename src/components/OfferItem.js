import React from 'react';
import { Table, Placeholder } from 'semantic-ui-react';

export default ({ offer, titles, placeholder }) => {
    return (
        <Table.Row>
            {titles.map(t =>
                <Table.Cell key={t}>
                    {(placeholder ?
                        <Placeholder><Placeholder.Line /></Placeholder>
                        : offer[t])}
                </Table.Cell>
            )}
        </Table.Row>
    );
};
