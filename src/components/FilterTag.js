import React, { Component } from 'react'
import { Icon, Label } from 'semantic-ui-react'

const ICON = {
    'company_name': 'briefcase',
    'base_salary': 'dollar sign',
    'equity': 'money bill alternate',
    'sign_bonus_string': 'handshake',
    'yearly_bonus': 'money bill alternate outline',
    'degree': 'graduation cap',
    'area': 'map marker',
    'experience_level': 'trophy',
    'year': 'calendar',
    'season': 'calendar alternate outline',
}

const SHOW_LABEL = {
    'equity': 'Equity',
    'sign_bonus_string': 'SignOn',
    'yearly_bonus': 'Yearly',
}

export default class FilterTag extends Component {
    render() {
        const { accessor, value, onClick } = this.props
        return (
            <Label>
                <Icon name='delete' onClick={onClick} />
                <Label.Detail>
                    <Icon name={ICON[accessor] || 'circle outline'} />
                    {SHOW_LABEL[accessor] && SHOW_LABEL[accessor] + '='}
                    {value}
                </Label.Detail>
            </Label>
        )
    }
}
