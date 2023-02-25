import { uid } from '@/libs/uniq-id'

import { Entity } from '../__common__/entity'

export class User extends Entity {
  isAdmin: boolean

  constructor(init: User) {
    super(init)

    this.isAdmin = init.isAdmin
  }

  static create(args: Omit<User, 'id'>) {
    return new User({
      id: uid(),
      isAdmin: args.isAdmin,
      createdAt: args.createdAt,
    })
  }
}
