import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Trang chủ',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },
 {
    _tag: 'CSidebarNavDropdown',
    name: 'Quản lí khoá học',
    route: '/courses',
    icon: 'cil-layers',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Danh sách khoá học',
        to: '/courses',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Tạo khoá học',
        to: '/courses/add',
      },
    ],
  }
]

export default _nav