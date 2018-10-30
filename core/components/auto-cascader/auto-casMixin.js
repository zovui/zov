/*为自动级联提供操作方法*/
export default {
    methods: {
        RadioInitCheck(V) {
            let _this = this
            for (let i = 0; i < V.length; i++) {
                let item = V[i]
                item.item.checked = false
                if (item.item.id === _this.originalV.id) {
                    item.item.checked = true
                    // console.log(_this.activeIndexes,item.value)
                    _this.initActiveIndexes = item.value.split(',')
                }
            }
        },
        MultipleInitCheck(V) {
            let _this = this
            for (let i = 0; i < V.length; i++) {
                let item = V[i]
                item.item.checked = false
            }
            _this.ClearValues()
            _this.originalV.forEach(id => {
                // _this.multipleValues.push(item)
                for (let i = 0; i < V.length; i++) {
                    let item = V[i]
                    if (item.item.id === id) {
                        _this.multipleValues.push(item.item)
                        item.item.checked = true
                        _this.initActiveIndexes = item.value.split(',')
                    }
                }
            })
        },
        Radio(val) {
            //单选
            val.forEach((item) => {
                item.checked = false
                if (item.children && item.children.length) {
                    this.Radio(item.children)
                }
            })
        },
        Multiple(val, checkedO) {
            //多选
            let _this = this
            let flagNum = 0
            for (let index = 0; index < val.length; index++) {
                let item = val[index]
                if (checkedO.id == item.id) {
                    val.splice(index, 1)
                    index--
                }
                if (item.__value.split(',').length === checkedO.__value.split(',').length) {
                    //记录当前组数据在结果中的数量
                    flagNum++
                }
            }
            //同步组全选功能的反勾选
            let groupIndex = checkedO.__value.split(',').length
            _this.panelBtns[groupIndex - 1].checked = false
            if (flagNum === 1) {
                //证明未把当前组的数据取消完
                // console.log('当前组最后一项','当前为第'+checkedO.__value.split(',').length+'组')
            }
        },
        ClearValues() {
            // 清空所选
            let _this = this
            if (!_this.multipleValues.length) {
                return
            }
            _this.multipleValues.forEach((item, index) => {
                item.checked = false
            })
            _this.multipleValues = []
            _this.panelBtns.forEach((item) => {
                item.checked = false
            })
        },
        GroupSelected(item, index) {
            let _this = this
            _this.loading = true
            let V = _this.multipleValues
            //组选择，意思是选择某一联
            if (!item.checked) {
                //在未选中状态
                setTimeout(() => { //#001
                    _this.querySelection.forEach((initem) => {
                        if (V.indexOf(initem.item) === -1 && initem.value.split(',').length === index + 1) {
                            //当前item满足条件：1、在已选结果中不存在；2、处于源数据的第[所选按钮下标]层
                            initem.item.checked = true
                            V.push(initem.item)
                        }
                    })
                    _this.loading = false
                    item.checked = !item.checked
                }, 100)
            } else {
                //在已选中状态
                setTimeout(() => { //#001
                    for (let i = 0; i < V.length; i++) {
                        if (V[i].__value.split(',').length === index + 1) {
                            V[i].checked = false
                            _this.multipleValues.splice(i, 1)
                            i--
                        }
                    }
                    _this.loading = false
                    item.checked = !item.checked
                }, 100)
            }
        },
        VisibleHide() {
            this.visible = false
            this.$emit('change', false)
        },

        OK() {
            this.defaultSelect()
            this.VisibleHide()
            if (this.multiple) {
                this.$emit('on-ok', this.values)
            } else {
                this.$emit('on-ok', this.value)
            }
        },
        Cancel() {
            let _this = this
            _this.loading = true
            setTimeout(() => {
                _this.BeforeCancel()
                _this.VisibleHide()
                if (_this.multiple) {
                    _this.$emit('on-cancel', this.values)
                } else {
                    _this.$emit('on-cancel', this.value)
                }
            }, 100)
        },
        BeforeCancel() {
            let _this = this
            if (_this.multiple) {
                _this.MultipleInitCheck(_this.querySelection)
            } else {
                _this.$set(_this.value, 'id', _this.originalV.id)
                _this.$set(_this.value, 'name', _this.originalV.name)
                _this.RadioInitCheck(_this.querySelection)
            }
            _this.loading = false
        },
        defaultSelect() {
            let _this = this
            //存初始值 value || values
            let D = _this.multiple ? JSON.stringify(_this.values) : JSON.stringify(_this.value)
            _this.originalV = eval('(' + D + ')')
        }
    }
}
