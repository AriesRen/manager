<template>
  <div class="user-container">
    <a-card :style="{ minHeight: '100%' }">
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
        <a-table bordered :pagination="false" size="middle" :rowKey="record => record.id" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :dataSource="menus" :loading="loading" @change="handleTableChange" :scroll="{ x: '130%' }" :indentSize="30">
          <template slot="createdTime" slot-scope="createdTime">
            <span>{{ createdTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
          <template slot="updatedTime" slot-scope="updatedTime">
            <span>{{ updatedTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
          <template slot="icon" slot-scope="text">
            <span>
              <a-icon :type="text" /></span>
          </template>
          <template slot="type" slot-scope="type">
            <my-tag :type="type | statusTypeFilter">{{ type | typeFilter }}</my-tag>
          </template>
          <template slot="action" slot-scope="text, record">
            <div>
              <a-button-group>
                <a-button>删除</a-button>
                <a-button type="primary">修改</a-button>
              </a-button-group>
            </div>
          </template>
        </a-table>
    </a-card>
  </div>
</template>
<script>
import { getMenus } from '@/api/menu'
import MyTag from '@/components/tag/MyTag'
export default {
  filters: {
    typeFilter(type) {
      const typeMap = {
        1: '按钮',
        2: '接口',
        0: '菜单'
      }
      return typeMap[type]
    },
    statusTypeFilter(type) {
      const typeMap = {
        0: 'info',
        1: 'success',
        2: 'danger'
      }
      return typeMap[type]
    }
  },
  components: {
    MyTag
  },
  data() {
    return {
      selectedRowKeys: [],
      loading: false,
      columns: [{
          title: '名称',
          dataIndex: 'title',
          align: 'left',
          fixed: 'left',
          width: 200,
        },
        { title: '路径', dataIndex: 'path', align: 'center' },
        {
          title: '图标',
          dataIndex: 'icon',
          align: 'center',
          scopedSlots: { customRender: 'icon' }
        },
        {
          title: '组件',
          dataIndex: 'component',
          align: 'center'
        },
        { title: '创建人', dataIndex: 'createdUser', align: 'center' },
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
        {
          title: '操作',
          key: 'operation',
          scopedSlots: { customRender: 'action' },
          align: 'center',
          width: 180,
          fixed: 'right'
        }
      ],
      menus: [],
      pagination: {
        current: 1,
        size: 5,
        total: 1,
        hasPerviousPage: false,
        hasNextPage: false,
        pages: 1
      },
      pageSizeOptions: ['5', '10', '20', '50']
    }
  },
  created() {
    this.fetchData()
  },
  computed: {},
  watch: {
    // pagination: {
    //   handler: function(val, oldval) {
    //     this.fetchData()
    //   },
    //   deep: true
    // }
  },
  methods: {
    fetchData() {
      this.loading = true
      getMenus().then((res) => {
        if (res.code === 200) {
          // const { pagination } = this
          // pagination.total = res.data.total
          // pagination.current = res.data.pageNum
          // pagination.size = res.data.pageSize
          // pagination.hasPerviousPage = res.data.hasPerviousPage
          // pagination.hasNextPage = res.data.hasNextPage
          // pagination.pages = res.data.pages
          this.menus = res.data
          this.loading = false
          // this.pagination = pagination
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
.user-container {
  margin-bottom: 40px;
  min-height: 100%;
  .ant-card {
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 0;
  }
}

.card-content {
  margin-bottom: 10px;
  height: 100%;
  font-size: 16px;
}

.pagination {
  margin: 15px auto;
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
