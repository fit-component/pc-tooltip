import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as classNames from 'classnames'
import * as $ from 'jquery'
import * as modules from './module'
import TransmitTransparently from '../../../../common/transmit-transparently/src'
import 'jbox'
import './index.scss'

@TransmitTransparently()
export default class Tooltip extends React.Component <modules.PropsDefine, modules.StateDefine> {
    static defaultProps = modules.defaultProps

    private dom: Element
    private $dom: any
    private jbox: any

    constructor(props: modules.PropsDefine) {
        super(props)
        this.state = modules.defaultState
    }

    componentDidMount() {
        this.dom = ReactDOM.findDOMNode(this)
        this.$dom = $(this.dom)

        let content = this.props.title
        let type = this.props.follow ? 'Mouse' : 'Tooltip'

        this.jbox = this.$dom.jBox(type, {
            content: content,
            position: !this.props.follow && this.props.position,
            trigger: this.props.trigger,
            closeOnMouseleave: this.props.stay,
            zIndex: this.props.zIndex,
            adjustPosition: true,
            adjustTracker: true
        })
    }

    componentWillUnmount() {
        this.jbox.destroy()
    }

    render() {
        const classes = classNames({
            '_namespace': true,
            [this.props['className']]: !!this.props['className']
        })

        return (
            <div {...this.props.others} className={classes}>
                {this.props.children}
            </div>
        )
    }
}