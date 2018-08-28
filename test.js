// test.js

import {
  request,
  summary,
  query,
  path,
  body,
  tags
} from 'koa-swagger-decorator'

const testTag = tags(['test'])

const userSchema = {
  name: {
    type: 'string',
    required: true
  },
  gender: {
    type: 'string',
    required: false,
    example: 'male'
  },
  groups: {
    type: 'array',
    required: true,
    items: {
      type: 'string',
      example: 'group1'
    },
  },
}

export default class Test {
  @request('get', '/users')
  @summary('get user list')
  @testTag
  @query({
    type: {
      type: 'number',
      required: true,
      default: 1,
      description: 'type'
    },
  })
  static async getUsers(ctx) {
    const users =  {}
    ctx.body = {
      users
    }
  }

  @request('get', '/users/{id}')
  @summary('get user info by id')
  @testTag
  @path({
    id: {
      type: 'number',
      required: true,
      default: 1,
      description: 'id'
    },
  })
  static async getUser(ctx) {
    const {
      id
    } = ctx.validatedParams
    const user = await {}
    ctx.body = {
      user
    }
  }

  @request('post', '/users')
  @testTag
  @body(userSchema)
  static async postUser(ctx) {
    // const body = ctx.request.body;
    const body = ctx.validatedBody
    ctx.body = {
      result: body
    }
  }

  static async temp(ctx) {
    ctx.body = {
      result: 'success'
    }
  }
}