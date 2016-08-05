import * as React from 'react'

export interface Position {
    x?: string,
    y?: string
}

export interface PropsDefine {
    /**
     * 文字提示的内容
     */
    title?: string
    /**
     * 控制显示位置
     */
    position?: Position
    /**
     * 触发方式
     */
    trigger?: string
    /**
     * 是否跟随鼠标
     */
    follow?: boolean
    /**
     * 相对于内容,在外部移动文字提示的相对位置
     */
    outside?: string
    /**
     * 鼠标移动到文字提示上,文字提示是否还显示
     */
    stay?: boolean
    /**
     * 层级
     */
    zIndex?: number
    /**
     * 透传组件
     */
    others?: any

    [x: string]: any
}

export const defaultProps: PropsDefine = {
    title: null,
    position: {
        x: 'center',
        y: 'top'
    },
    trigger: 'mouseenter',
    follow: false,
    outside: 'y',
    stay: false,
    zIndex: 999
}

export interface StateDefine {
}

export const defaultState: StateDefine = {}