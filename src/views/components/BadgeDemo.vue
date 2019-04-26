<template>
    <div>
        <ul>
            <li>
                <Badge :count="3">
                    <a href="#" class="demo-badge"></a>
                </Badge>
            </li>
            <li>
                <span>
                    <Badge dot>
                        <Icon iconname="albums" />
                    </Badge>
                </span>
                <span>
                    <Badge dot>
                        <a href="#" class="demo-badge"></a>
                    </Badge>
                </span>
                <span>
                    <Badge dot>
                        <a href="#">可以是一个链接</a>
                    </Badge>
                </span>

            </li>
            <li>
                <span>
                    <Badge :count="100">
                        <a href="#" class="demo-badge"></a>
                    </Badge>
                </span>
                <span>
                    <Badge :count="1000" overflow-count="999">
                        <a href="#" class="demo-badge"></a>
                    </Badge>
                </span>
            </li>
            <li>
                <span>
                    <Badge :count="10"></Badge>
                </span>
                <span>
                    <Badge :count="20" class-name="demo-badge-alone"></Badge>
                </span>
            </li>
            <li>
                <span>
                    <Badge text="new">
                        <a href="#" class="demo-badge"></a>
                    </Badge>
                </span>
                <span>
                    <Badge text="hot">
                        <a href="#" class="demo-badge"></a>
                    </Badge>
                </span>
            </li>
            <li>
                <Badge status="success" />
                <Badge status="error" />
                <Badge status="default" />
                <Badge status="processing" />
                <Badge status="warning" />
                <br />
                <Badge status="success" text="Success" />
                <br />
                <Badge status="error" text="Error" />
                <br />
                <Badge status="default" text="Default" />
                <br />
                <Badge status="processing" text="Processing" />
                <br />
                <Badge status="warning" text="Warning" />
            </li>
            <li>
                <span>
                    <Badge :count="5" type="primary">
                        <a href="#" class="demo-badge"></a>
                    </Badge>
                </span>
                <span>
                    <Badge :count="5" type="success">
                        <a href="#" class="demo-badge"></a>
                    </Badge>
                </span>
                <span>
                    <Badge :count="5" type="normal">
                        <a href="#" class="demo-badge"></a>
                    </Badge>
                </span>
                <span>
                    <Badge :count="5" type="info">
                        <a href="#" class="demo-badge"></a>
                    </Badge>
                </span>
                <span>
                    <Badge :count="5" type="error">
                        <a href="#" class="demo-badge"></a>
                    </Badge>
                </span>
                <span>
                    <Badge :count="5" type="warning">
                        <a href="#" class="demo-badge"></a>
                    </Badge>
                </span>
            </li>
        </ul>
        <table>
            <tr>
                <th>属性</th>
                <th>说明</th>
                <th>类型</th>
                <th>默认值</th>
            </tr>
            <tr>
                <td>count</td>
                <td>显示的数字，大于<code>overflowCount</code>时，显示<code>${overflowCount}+</code>，为 0 时隐藏</td>
                <td>Number</td>
                <td>-</td>
            </tr>
            <tr>
                <td>overflow-count</td>
                <td>展示封顶的数字值</td>
                <td>Number | String</td>
                <td>99</td>
            </tr>
            <tr>
                <td>dot</td>
                <td>不展示数字，只有一个小红点，如需隐藏 dot ，需要设置<code>count</code>为 0 </td>
                <td>Boolean</td>
                <td>false</td>
            </tr>
            <tr>
                <td>class-name</td>
                <td>自定义的class名称，dot 模式下无效</td>
                <td>String</td>
                <td>-</td>
            </tr>
            <tr>
                <td>type</td>
                <td>使用预设的颜色，可选值为 success、primary、normal、error、warning、info</td>
                <td>String</td>
                <td>-</td>
            </tr>
            <tr>
                <td>show-zero</td>
                <td>当数值为 0 时，是否展示 Badge</td>
                <td>Boolean</td>
                <td>false</td>
            </tr>
            <tr>
                <td>status</td>
                <td>设置 Badge 为状态点，可选值为 success、processing、default、error、warning</td>
                <td>String</td>
                <td>-</td>
            </tr>
            <tr>
                <td>text</td>
                <td>自定义内容，如果设置了 status，则为状态点的文本</td>
                <td>String</td>
                <td>-</td>
            </tr>
            <tr>
                <td>offset</td>
                <td>设置状态点的位置偏移，格式为 [x, y]</td>
                <td>Array</td>
                <td>-</td>
            </tr>
        </table>
    </div>
</template>
<script>
import Icon from '../../../core/components/icon'
export default {
    components: {
        Icon
    }
}
</script>
<style lang="scss" scoped>
    ul {
        li {
            margin: 0 0 25px 0;

            span {
                display: inline-block;
                margin: 0 5px 0;
            }
        }
    }

    .demo-badge {
        width: 42px;
        height: 42px;
        background: #eee;
        border-radius: 6px;
        display: inline-block;

        &-alone {
            background: #5cb85c !important;
        }
    }

    table {
        font-size: 12px;
        border-collapse: collapse;
        border-spacing: 0;
        empty-cells: show;
        border: 1px solid #e9e9e9;
        width: 100%;
        margin-bottom: 24px;

        th,td {
            border: 1px solid #e9e9e9;
            padding: 8px 16px;
            text-align: left;
        }
    }
</style>
