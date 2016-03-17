import React from 'react'
import Tooltip from 'fit-tooltip'
import Button from 'fit-button'

export default class Demo extends React.Component {
    render() {
        return (
            <Tooltip title="可以被选中"
                     stay={true}>
                <Button>移上来,可以选中文字提示</Button>
            </Tooltip>
        )
    }
}