import React from 'react'
import Tooltip from 'fit-tooltip'

export default class Demo extends React.Component {
    render() {
        return (
            <Tooltip title="提示文字">
                鼠标移动上来,会出现提示
            </Tooltip>
        )
    }
}