<template>
    <ul>
        <li>
            <p>标题：</p>
            <p :class="{ 'form-group-error': $v.noticeTitle.$error }">
                <Input
                    v-model="$v.noticeTitle.$model"
                    placeholder="请输入通知标题"/>
                <span class="form-group-message" v-if="$v.noticeTitle.$dirty && !$v.noticeTitle.required">标题不能为空</span>
            </p>
        </li>
        <li>
            <p>内容：</p>
            <p :class="{ 'form-group-error': $v.noticeContent.$error }">
                <Input
                    v-model="$v.noticeContent.$model"
                    type="textarea"
                    :autosize="{minRows: 5, maxRows: 5}"
                    placeholder="请输入通知内容" style=""/>
                <span class="form-group-message" v-if="$v.noticeContent.$dirty && !$v.noticeContent.required">内容不能为空</span>
            </p>
        </li>
        <li>
            <p>日期范围：</p>
            <p :class="{ 'form-group-error': $v.dateValue.$error }">
                <CDate :dateVal="dateValue"
                       dateType="daterange"
                       format="yyyy/MM/dd"
                       :placeholder='"请选择日期"'
                       @changeDate="handleChange"
                        >
                </CDate>
                <span class="form-group-message" v-if="$v.dateValue.$dirty && !$v.dateValue.required">内容不能为空</span>
            </p>
        </li>
    </ul>
</template>

<script>
    import CDate from '@/components/comIview/cdate';
    import { required } from 'vuelidate/lib/validators';

    export default {
        name: '',
        props: [''],
        data() {
            return {
                noticeId: '', //通知ID
                noticeTitle: '',//标题
                noticeContent: '',//内容
                // startTime: '',//开始时间
                // endTime: '',//结束时间
                dateValue: [],
            };
        },

        validations: {
            noticeTitle: {
                required,
            },
            noticeContent: {
                required,
            },
            dateValue: {
                required,
            },
        },
        components: {
            CDate,
        },

        computed: {
            startTime() {
                if (this.dateValue.length !== 0) {
                    return this.dateValue[0];
                } else {
                    return '';
                }
            },
            endTime() {
                if (this.dateValue.length !== 0) {
                    return this.dateValue[1];
                } else {
                    return '';
                }
            },
        },

        beforeMount() {
        },

        mounted() {
        },

        methods: {
            handleChange(val) {
                const dateVal = val.val;
                if (dateVal && dateVal.length && dateVal[0] !== '' && dateVal[1] !== '') {
                    this.dateValue = dateVal;
                } else {
                    this.dateValue = [];
                }
                this.$v.dateValue.$touch();
            },
            validateForm() {
                this.$v.$touch();
                // 返回true表示验证成功即表单符合输入要求
                return !this.$v.$invalid;
            },
            resetForm() {
                this.noticeId = '';
                this.noticeTitle = '';
                this.noticeContent = '';
                this.dateValue = [];
                this.$v.$reset();
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
            padding: 4px 0;

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