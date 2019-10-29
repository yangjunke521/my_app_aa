<template>
    <ul>
        <li>
            <p>旧收费项目：</p>
            <p :class="{ 'form-group-error': $v.oldPriceId.$error }">
                <Select
                        ref="oldSelector"
                        v-model='$v.oldPriceId.$model'
                        :clearable='clearable'
                        @on-change="oldPChange">
                    <Option v-for="item in oldPriceData" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                <span class="form-group-message" v-if="$v.oldPriceId.$dirty && !$v.oldPriceId.required">旧收费项目不能为空</span>
            </p>
        </li>
        <li>
            <p>新收费项目：</p>
            <p :class="{ 'form-group-error': $v.newPriceId.$error }">
                <Select
                        ref="newSelector"
                        v-model='$v.newPriceId.$model'
                        :clearable='clearable'
                        :disabled="newPriceSelDisabled">
                    <Option v-for="item in newPriceData" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                <span class="form-group-message" v-if="$v.oldPriceId.$dirty && !$v.newPriceId.oldpIsNull">请先选择旧收费项目</span>
                <span class="form-group-message" v-else-if="$v.newPriceId.$dirty && !$v.newPriceId.required">新收费项目不能为空</span>
            </p>
        </li>
        <li>
            <p>调整时间：</p>
            <p :class="{ 'form-group-error': $v.adjustDate.$error }">
                <CDate :dateVal="$v.adjustDate.$model"
                       dateType="date"
                       format="yyyy-MM-dd"
                       placeholder='请选择日期'
                       @changeDate="handleChange"
                >
                </CDate>
                <span class="form-group-message" v-if="$v.adjustDate.$dirty && !$v.adjustDate.required">调整日期不能为空</span>
                <span class="form-group-message" v-else-if="$v.adjustDate.$dirty && !$v.adjustDate.isTomorrow">日期必须是明天之后的日期</span>
            </p>
        </li>
    </ul>
</template>

<script>
    import { required } from 'vuelidate/lib/validators';
    import CDate from '@/components/comIview/cdate';

    export default {
        name: '',
        data() {
            return {
                oldPriceId: '', //旧收费项目ID
                newPriceId: '',//新收费项目ID
                newPriceSelDisabled: true,
                clearable: true,
                adjustDate: '',
                oldPriceData: [],
                newPriceData: [],
            };
        },

        validations: {
            oldPriceId: {
                required,
            },
            newPriceId: {
                required,
                oldpIsNull() {
                    return !!(this.oldPriceId && this.oldPriceId !== '');
                },
            },
            adjustDate: {
                required,
                isTomorrow(val) {
                    const selectedDate = new Date(`${val} 00:00:00`);
                    const now = new Date();
                    const nowStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
                    return (nowStr !== val && selectedDate.getTime() > now.getTime());
                },
            },
        },
        components: {
            CDate
        },

        computed: {
        },

        beforeMount() {
        },

        mounted() {
        },

        methods: {
            oldPChange(data) {
                this.$emit("oldPChange", data);
            },
            handleChange(val) {
                this.adjustDate = val.val;
                this.$v.adjustDate.$touch();
            },
            validateForm() {
                this.$v.$touch();
                // 返回true表示验证成功即表单符合输入要求
                return !this.$v.$invalid;
            },
            resetForm() {
                this.oldPriceId = '';
                this.newPriceId = '';
                this.adjustDate = '';
                this.newPriceData = [];
                this.newPriceSelDisabled = true;
                this.$nextTick(() => {
                    this.$refs.oldSelector.clearSingleSelect();
                    this.$refs.newSelector.clearSingleSelect();
                    this.$v.$reset();
                });
            },
        },

        watch: {
        }
    }

</script>
<style lang='less' scoped>
    ul {
        overflow: hidden;
        li {
            overflow: hidden;
            p {
                float: left;

                &:first-child {
                    width: 25%;
                }

                &:last-child {
                    width: 75%;
                }
            }
        }
    }
</style>