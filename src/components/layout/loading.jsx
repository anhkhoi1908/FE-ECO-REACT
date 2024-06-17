import React from 'react'
import { Spin } from "antd";

export default function Loading({children, isPending, delay=200}) {
  return (
    <div>
      <Spin spinning={isPending} delay={delay}>
        {children}
      </Spin>
    </div>
  )
}
