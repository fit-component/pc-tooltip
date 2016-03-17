import React from 'react'
import Tooltip from 'fit-tooltip'
import Button from 'fit-button'

export default class Demo extends React.Component {
    render() {
        return (
            <Tooltip title="跟随鼠标的提示文字"
                     follow={true}>
                <Button>跟随鼠标</Button>
            </Tooltip>
        )
    }
}