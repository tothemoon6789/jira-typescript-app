import * as React from 'react';
import { Avatar, Divider, Tooltip } from 'antd';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';

export interface IMemberProps {
  data: any
}

export function Member(props: IMemberProps) {
  const { data } = props
  const renderUser = () => {
    return data?.map((user: any, index: number) => {
      return index > 0 && <Avatar key={index} src={user.avatar} />
    })
  }
  return (

      <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
        {data.length > 0 && <Avatar src={data[0].avatar} />}
        {renderUser()}
      </Avatar.Group>
     
  )

}
