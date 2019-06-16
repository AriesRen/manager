<template>
  <a-card class="user-container">
    <div class="card-content">
      <a-row :gutter="16">
        <a-col span="16">
          <a-button-group>
            <a-button>
              <a-icon type="delete" />删除</a-button>
            <a-button>
              <a-icon type="plus" />新增</a-button>
          </a-button-group>
        </a-col>
        <a-col span="8">
          <a-input-search placeholder="search" @search="onSearch" enterButton />
        </a-col>
      </a-row>
      <a-divider />
      <a-table bordered :pagination="false" size="middle" :rowKey="record => record.id" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :dataSource="user" :loading="loading" @change="handleTableChange">
        <template slot="createdTime" slot-scope="createdTime">
          <span>{{ createdTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
        <template slot="updatedTime" slot-scope="updatedTime">
          <span>{{ updatedTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
        <template slot="status" slot-scope="status">
          <my-tag :type="status | statusTypeFilter">{{ status | statusFilter }}</my-tag>
        </template>
        <template slot="action" slot-scope="text, record">
          <div>
            <a-button-group>
              <a-button>删除</a-button>
              <a-button type="primary">修改</a-button>
              <a-button>查看</a-button>
            </a-button-group>
          </div>
        </template>
      </a-table>
      <div class="pagination">
        <a-pagination showQuickJumper :total="pagination.total" :pageSize.sync="pagination.size" v-model="pagination.current">
          <template slot='buildOptionText' slot-scope='props'>
            <span>{{props.value}}条/页</span>
          </template>
        </a-pagination>
      </div>
    </div>
  </a-card>
</template>
<script>
import { getUsers } from '@/api/user'
import MyTag from '@/components/tag/MyTag'
export default {
  components: {
    MyTag
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: '正常',
        2: '锁定',
        0: '未激活'
      }
      return statusMap[status]
    },
    statusTypeFilter(status) {
      const typeMap = {
        0: 'info',
        1: 'success',
        2: 'danger'
      }
      return typeMap[status]
    }
  },
  data() {
    return {
      selectedRowKeys: [],
      loading: false,
      columns: [
        { title: '用户名', dataIndex: 'username', align: 'center' },
        { title: '昵称', dataIndex: 'nickname', align: 'center' },
        { title: '状态', dataIndex: 'status', scopedSlots: { customRender: 'status' }, align: 'center' },
        { title: '邮箱', dataIndex: 'email', align: 'center' },
        {
          title: '创建时间',
          dataIndex: 'createdTime',
          scopedSlots: { customRender: 'createdTime' },
          align: 'center',
          width: 180
        },
        {
          title: '修改时间',
          dataIndex: 'updatedTime',
          scopedSlots: { customRender: 'updatedTime' },
          align: 'center',
          width: 180
        },
        { title: '创建人', dataIndex: 'createdUser', align: 'center' },
        {
          title: '操作',
          key: 'operation',
          scopedSlots: { customRender: 'action' },
          align: 'center',
          width: 230,
          fixed: 'right'
        }
      ],
      user: [],
      pagination: {
        current: 1,
        size: 5,
        total: 1,
        hasPerviousPage: false,
        hasNextPage: false,
        pages: 1
      },
      pageSizeOptions: ['5', '10', '20', '50'],
      username: ''
    }
  },
  created() {
    this.fetchData()
  },
  computed: {

  },
  watch: {
    pagination: {
      handler: function(val, oldval) {
        this.fetchData()
      },
      deep: true
    }
  },
  methods: {
    fetchData(pagination = this.pagination, params = {}) {
      this.loading = true
      getUsers({ ...pagination, ...params }).then((res) => {
        console.log(res)
        if (res.code === 200) {
          this.pagination.total = res.data.total
          this.pagination.current = res.data.pageNum
          this.pagination.size = res.data.pageSize
          this.pagination.hasPerviousPage = res.data.hasPerviousPage
          this.pagination.hasNextPage = res.data.hasNextPage
          this.pagination.pages = res.data.pages
          this.user = res.data.list
          this.loading = false
        }
      })
      this.loading = false
    },
    onSearch(val) {
      console.log(val)
      this.fetchData({ username: val })
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    onShowSizeChange(current, size) {
      this.pagination.size = size
      this.fetchData()
    },
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination)
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.user-container,
.card-content {
  width: 100%;
  height: 100%;
}

.card-content {
  font-size: 16px;
}

.pagination {
  margin: 20px auto;
  float: right;

  .ant-pagination {
    width: 100%;

    li {
      margin: 0px 30px;
    }
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

</style>
