import React from 'react'
import Tooltip from 'fit-tooltip'
import Button from 'fit-button'

export default class Demo extends React.Component {
    render() {
        return (
            <Tooltip title="文字提示">
                <Button>基本用法</Button>
            </Tooltip>
        )
    }
}