import {
  HomeOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  ToolOutlined,
  UserOutlined,
  SafetyOutlined,
  DatabaseOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined
} from '@ant-design/icons';
const menuList = [
    {
      title: '首页', // 菜单标题名称
      key: 'home', // 对应的path
      icon: <HomeOutlined />, // 图标名称
      path: '/admin/home'
    },
    {
      title: '商品',
      key: 'prod_about',
      icon: <AppstoreOutlined />,
      children: [ // 子菜单列表
        {
          title: '分类管理',
          key: 'category',
          icon: <UnorderedListOutlined />,
          path: '/admin/prod_about/category'
        },
        {
          title: '商品管理',
          key: 'product',
          icon: <ToolOutlined />,
          path: '/admin/prod_about/product'
        },
      ]
    },
  
    {
      title: '用户管理',
      key: 'user',
      icon: <UserOutlined />,
      path: '/admin/user'
    },
    {
      title: '角色管理',
      key: 'role',
      icon: <SafetyOutlined />,
      path: '/admin/role'
    },
  
    {
      title: '图形图表',
      key: 'charts',
      icon: <DatabaseOutlined />,
      children: [
        {
          title: '柱形图',
          key: 'bar',
          icon: <BarChartOutlined />,
          path: '/admin/charts/bar'
        },
        {
          title: '折线图',
          key: 'line',
          icon: <LineChartOutlined />,
          path: '/admin/charts/line'
        },
        {
          title: '饼图',
          key: 'pie',
          icon: <PieChartOutlined />,
          path: '/admin/charts/pie'
        },
      ]
    },
  ]
  
  export default menuList