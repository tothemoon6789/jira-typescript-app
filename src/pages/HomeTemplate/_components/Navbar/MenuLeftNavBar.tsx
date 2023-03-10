import { Menu, Progress } from 'antd';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import TheatersIcon from '@mui/icons-material/Theaters';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IMenuLeftNavBarProps {
}

export function MenuLeftNavBar(props: IMenuLeftNavBarProps) {
  const navigate = useNavigate()
  const items: ItemType[] = [
    {
      icon: <i className="fa-solid fa-list-check"></i>,
      key: 'management',
      label: 'Project Management'
    },
    {
      icon: <i className="fa-solid fa-plus"></i>,
      key: 'create',
      label: 'Create Project'
    },
    {
      icon: <AddIcon />,
      key: 'creat-task',
      label: 'Create Task'
    }
    
  ]
  return (
    <>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={items}

        onClick={(event) => {
          switch (event.key) {
            case 'management':
              navigate('/management')
              console.log(event);

              break;
            case 'create':
              navigate('/create')
              console.log(event);
              break;
            case 'creat-task':
              navigate('/create-task')
              console.log(event);
              break;
            default:
              navigate('/')
              break;
          }
        }}
      />
      <div style={{ padding: '10px' }}>
        <Progress percent={30} />
        <Progress percent={50} status="active" />
        <Progress percent={70} status="exception" />
        <Progress percent={100} />
        <Progress percent={50} showInfo={false} />
      </div>

    </>
  );
}
