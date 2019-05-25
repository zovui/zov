// 「#003」
import './icons/index.css'
// 【_c】全局注册式组件
import Affix from './components/affix'
import { Anchor, AnchorLink } from './components/anchor'
import BackTop from './components/back-top'
import LongList from './components/long-list'
import Icon from './components/icon'
import Button from './components/button'
import ButtonGroup from './components/button-group'
import Tag from './components/tag'
import Spin from './components/spin'
import Switcher from './components/switch'
import Input from './components/input'
import Popper from './components/popper'
import ToolTip from './components/tooltip'
import Drop from './components/drop'
import Select from './components/select'
import BigDataList from './components/big-data-list'
import Cascader from './components/cascader'
import DatePicker from './components/date-picker'
import TimePicker from './components/time-picker'
import ColorPicker from './components/color-picker'
import { Menu, MenuSub, MenuGroup, MenuOption } from './components/menu'
import { Layout, Header, Footer, Content, Sider } from './components/layout'
import { Row, Col } from './components/grid'
import Slider from './components/slider'
import Badge from './components/badge'
import Radio from './components/radio'
import RadioGroup from './components/radio-group'
import Checkbox from './components/checkbox'
import CheckboxGroup from './components/checkbox-group'
import Breadcrumb from './components/breadcrumb'
import BreadcrumbItem from './components/breadcrumb-item'
import { Tabs, TabPane } from './components/tabs'
// 【_f】全局方法式组件
import Dark from './components/dark'
import LoadingBar from './components/loading-bar'
import Notice from './components/notice'
import Message from './components/message'
import Modal from './components/modal'

// 全局指令
import './directives'
const components = {
	// 【_c】
	Dark,
	LoadingBar,
	Notice,
	Message,
	Modal,
	// 【_f】
	Affix,
	Anchor,
	AnchorLink,
	BackTop,
	LongList,
	Icon,
	Button,
	ButtonGroup,
	Tag,
	Spin,
	Switcher,
	Input,
	Popper,
	ToolTip,
	Drop,
	Select,
	BigDataList,
	Cascader,
	DatePicker,
	TimePicker,
	ColorPicker,
	Menu,
	MenuSub,
	MenuGroup,
	MenuOption,
	Layout,
	Header,
	Footer,
	Content,
	Sider,
	Row,
	Col,
	Badge,
	Slider,
	Radio,
	RadioGroup,
	Checkbox,
	CheckboxGroup,
	Breadcrumb,
	BreadcrumbItem,
	Tabs,
	TabPane
}
Object.keys(components).forEach(key => {
	components['z' + key] = components[key]
})
const install = (Vue, option = {}) => {
	if (install.installed) return // 防止多次安装
	for (let key in components) {
		Vue.component(key, components[key])
	}
	// 下面是全局安装的方法
	Vue.prototype.$Dark = Dark
	Vue.prototype.$LoadingBar = LoadingBar
	Vue.prototype.$Notice = Notice
	Vue.prototype.$Message = Message
	Vue.prototype.$Modal = Modal
}
// 自动安装【browser端引用的时候可以省去Vue.use】
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue) // 调用 `MyPlugin.install(Vue)`
}
const zov = {
	install,
	...components
}
// 按需暴露全局组件
export {
	// 【_c】
	Dark,
	LoadingBar,
	Notice,
	Message,
	Modal,
	// 【_f】
	Affix,
	Anchor,
	AnchorLink,
	BackTop,
	LongList,
	Icon,
	Button,
	ButtonGroup,
	Tag,
	Spin,
	Switcher,
	Input,
	Popper,
	ToolTip,
	Drop,
	Select,
	BigDataList,
	Cascader,
	DatePicker,
	TimePicker,
	ColorPicker,
	Menu,
	MenuSub,
	MenuGroup,
	MenuOption,
	Layout,
	Header,
	Footer,
	Content,
	Sider,
	Row,
	Col,
	Badge,
	Slider,
	Radio,
	RadioGroup,
	Checkbox,
	CheckboxGroup,
	Breadcrumb,
	BreadcrumbItem,
	Tabs,
	TabPane
}
// 将整个zov暴露出去
export default zov
