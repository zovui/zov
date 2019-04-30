<template>
	<div class="date-demo">
		<p>单选</p>
		日：
		<DatePicker
			size="large"
			autofocus
			placeholder="日"
			v-model="a1"
			format="YYYY年MM月DD日"
		/>
		月：
		<DatePicker size="small" placeholder="月" type="month" v-model="a2" />
		年：
		<DatePicker placeholder="年" type="year" v-model="a3" />
		<p>多选</p>
		日：
		<DatePicker multiple placeholder="日" v-model="d1" />
		月：
		<DatePicker multiple placeholder="月" type="month" v-model="d2" />
		年：
		<DatePicker multiple placeholder="年" type="year" v-model="d3" />
		周：
		<DatePicker
			multiple
			placeholder="周"
			type="week"
			format="YY年，第W周"
			v-model="d4"
		/>
		时：
		<DatePicker
			autofocus
			placeholder="时间 time"
			type="datetime"
			v-model="d5"
		/>
		<h3>限制</h3>
		<DatePicker
			multiple
			placeholder="年"
			type="year"
			:disabled-date="
				date => {
					return date.format('YYYY') < new Date('2023').getFullYear()
				}
			"
		/>
		<DatePicker
			placeholder="日"
			:disabled-date="
				date => {
					return (
						date.format('DD') % 2 === 0 && date.isBefore(new Date())
					)
				}
			"
		/>
		<DatePicker
			placeholder="月"
			type="month"
			:disabled-date="
				date => {
					return date.isBefore(new Date())
				}
			"
		/>
		<DatePicker value="2019-14" placeholder="周" type="week" />
		<DatePicker
			multiple
			placeholder="时间,内部将 multiple 转换为单选"
			type="datetime"
			v-model="d6"
			format="YYYY-MM-DD HH:mm"
			:disabled-times="{
				h: [1, 2],
				m: (() => {
					return [2, 4, 6, 8]
				})(),
				s: []
			}"
		/>
		<!-- 参数-->
		<div
			style="border: 3px dashed; text-align: left; margin: 15px;padding: 15px"
		>
			<h3>参数</h3>
			<p>@v-model 必传，Array || String，组件输出的值</p>
			<p>
				@type 非必传，String，组件类型，['date', 'datetime', 'year',
				'month', 'week']
			</p>
			<span style="color: green">
				说明：
				1、目前不支持daterange、monthrange、yearrange、weekrange、datetimerange等范围类型的控件，这种控件表现能力有限，可以通过业务代码两个控件实现。
				2、datetime模式下不支持多选，组件会将@multiple参数设置为false。
			</span>
			<p>
				@format
				非必传，Date类型，可以根据下面表格对照组合format后的日期string
			</p>
			<p>
				@multiple 非必传，Boolean，多选，默认:false，仅在
				date、week、month、year 下可用
			</p>
			<p>@no-arrow 非必传，Boolean，drop容器的尖角，默认:true</p>
			<p>@placeholder 非必传，String，placeholder，默认:''</p>
			<p>@autofocus 非必传，Boolean，自动获取焦点，默认:false</p>
			<p>@disabled 非必传，Boolean，disabled，默认:false</p>
			<p>
				@disabled-date 非必传，Function，限制禁用日期，默认: () => false
			</p>
			<span style="color: green">
				用法： // @date
				每一天、每一年今天、每一月今天、每一周今天。返回表达式的结果作为组件内部的判断依据；date为一个dayjs对象。
				eg: (date) => { // 小于今天的偶数日 date.format('DD') % 2 === 0
				&& date.isBefore(new Date()) }
			</span>
			<p>
				@disabled-times 非必传，Object，限制禁用时间，默认: {h: [], m:
				[], s: []}
			</p>
			<span style="color: green">
				用法： { h: [1, 2], m: [...], s: [...] }
			</span>
			<p>
				@hide-disabled-options 非必传，Boolean，隐藏限制项，默认: false
			</p>
			<p>@use12HourSystem 非必传，Boolean，采用12时制，默认：false</p>
			<span style="color: green">
				说明：采用12时制度后 format 默认设置为 YYYY-MM-DD hh:mm:ss a
				，调用者应当遵循12时制format规则
				<br />
				如：YYYY-MM-DD h:m:s a 或者 YYYY-MM-DD h:m:s A等。 <br />
				注意：此参数优先级低于format。
			</span>
			<h3>回调事件</h3>
			<p>@on-change 组件drop呼出、收起的回调，形参：Boolean</p>
			<p>
				@on-open-change
				组件值发生变化后的回调，形参：单选【当前所选项的item】，多选【已选所有项的items】
			</p>
			<h3>补充说明</h3>
			<p style="color: red">
				<b>组件对数据的处理分为parse和format两部分</b>
				<b>1、parse</b>
				<br />v-model接收的值为date类型，date格式应该遵循js原生格式，也就是说能被
				Date 对象验证通过的字符串。 <br />例如： <br />new
				Date('2019.12.11') <br />new Date('2019/12/11') <br />new
				Date('2019-12-11') <br />因此组件接受默认值得数据格式应该如下：
				<br />'2019-11' <br />'2019' <br />'19' <br />'2019-2-03'
				<br />['2011-05-06', '2012-06-09'] <br />......
				<br />
				<b>2、format</b>
				<br />组件可以通过设置format字段自由组合date字符串，作为组件的输出。
				<br />例如 <br />YYYY年MM月DD日，2019年12月20日
				<br />YYYY=MM=DD，2019=12=20
				<br />开发者也可以通过on-change事件的回调中对dayjs对象进行format
			</p>
			<b>format 格式：</b>
			<table border="1px">
				<thead>
					<tr>
						<th width="100">格式</th>
						<th width="100">输出</th>
						<th>描述</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>YY</code></td>
						<td>18</td>
						<td>两位数的年份</td>
					</tr>
					<tr>
						<td><code>YYYY</code></td>
						<td>2018</td>
						<td>四位数的年份</td>
					</tr>
					<tr>
						<td><code>M</code></td>
						<td>1-12</td>
						<td>月份，从 1 开始</td>
					</tr>
					<tr>
						<td><code>MM</code></td>
						<td>01-12</td>
						<td>月份，两位数</td>
					</tr>
					<tr>
						<td><code>MMM</code></td>
						<td>Jan-Dec</td>
						<td>简写的月份名称</td>
					</tr>
					<tr>
						<td><code>MMMM</code></td>
						<td>January-December</td>
						<td>完整的月份名称</td>
					</tr>
					<tr>
						<td><code>D</code></td>
						<td>1-31</td>
						<td>月份里的一天</td>
					</tr>
					<tr>
						<td><code>DD</code></td>
						<td>01-31</td>
						<td>月份里的一天，两位数</td>
					</tr>
					<tr>
						<td><code>d</code></td>
						<td>0-6</td>
						<td>一周中的一天，星期天是 0</td>
					</tr>
					<tr>
						<td><code>dd</code></td>
						<td>Su-Sa</td>
						<td>最简写的一周中一天的名称</td>
					</tr>
					<tr>
						<td><code>ddd</code></td>
						<td>Sun-Sat</td>
						<td>简写的一周中一天的名称</td>
					</tr>
					<tr>
						<td><code>dddd</code></td>
						<td>Sunday-Saturday</td>
						<td>一周中一天的名称</td>
					</tr>
					<tr>
						<td><code>H</code></td>
						<td>0-23</td>
						<td>小时</td>
					</tr>
					<tr>
						<td><code>HH</code></td>
						<td>00-23</td>
						<td>小时，两位数</td>
					</tr>
					<tr>
						<td><code>h</code></td>
						<td>1-12</td>
						<td>小时, 12 小时制</td>
					</tr>
					<tr>
						<td><code>hh</code></td>
						<td>01-12</td>
						<td>Hours, 12 小时制, 两位数</td>
					</tr>
					<tr>
						<td><code>m</code></td>
						<td>0-59</td>
						<td>分钟</td>
					</tr>
					<tr>
						<td><code>mm</code></td>
						<td>00-59</td>
						<td>分钟，两位数</td>
					</tr>
					<tr>
						<td><code>s</code></td>
						<td>0-59</td>
						<td>秒</td>
					</tr>
					<tr>
						<td><code>ss</code></td>
						<td>00-59</td>
						<td>秒 两位数</td>
					</tr>
					<tr>
						<td><code>SSS</code></td>
						<td>000-999</td>
						<td>毫秒 三位数</td>
					</tr>
					<tr>
						<td><code>Z</code></td>
						<td>+5:00</td>
						<td>UTC 的偏移量</td>
					</tr>
					<tr>
						<td><code>ZZ</code></td>
						<td>+0500</td>
						<td>UTC 的偏移量，数字前面加上 0</td>
					</tr>
					<tr>
						<td><code>A</code></td>
						<td>AM PM</td>
						<td></td>
					</tr>
					<tr>
						<td><code>a</code></td>
						<td>am pm</td>
						<td></td>
					</tr>
				</tbody>
			</table>
			<pre>
                format 是矫正时间格式的依赖，开发者需要保证给组件传入默认的value格式是遵循format规定的。
                默认：
                YYYY
                YYYY-MM
                YYYY-MM-DD
                YYYY-WW
                YYYY HH
                YYYY HH:mm
                YYYY HH:mm:ss
            </pre>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			a1: '2019-03-11',
			a2: '2019-02',
			a3: '2019-02',
			d1: ['2019-03-10', '2019-03-11'],
			d2: ['2019-01', '2019-02'],
			d3: ['2019-02', '2020'], // 从第一项可以看出有值矫正
			d4: ['2019-09'],
			d5: '2019-03-12 10:12:33',
			d6: ['2019-03-12 10:12:33', '2019-03-14 15:15:83']
		}
	}
}
</script>
<style scoped lang="scss">
.date-demo {
	display: block;
}
</style>
