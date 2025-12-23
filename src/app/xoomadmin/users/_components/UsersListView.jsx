import { ImBin } from 'react-icons/im';

export default function UsersListView({ user, deleteUsersModalHandler }) {
  const expiryDate = user?.expiresAt
    ? new Date(user.expiresAt * 1000).toLocaleDateString()
    : 'N/A';

  return (
    <div className="grid grid-cols-12 items-center gap-x-5 rounded-md border p-3">
      {/* User Image */}
      <div className="col-span-2">
        <img
          src={user?.image || '/icons/user-black.png'}
          alt="User Image"
          className="h-16 w-16 rounded-md object-cover"
        />
      </div>

      {/* Phone */}
      <div className="col-span-3">
        <p className="font-medium">Phone: {user?.phone || 'N/A'}</p>
        <p className="text-sm text-gray-500">Ref: {user?.reference || 'N/A'}</p>
      </div>

      {/* Membership */}
      <div className="col-span-2 text-center">
        <p className="font-medium">{user?.membershipPlan}</p>
        <p
          className={`text-sm font-semibold ${
            user.paid ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {user.paid ? 'Paid' : 'Unpaid'}
        </p>
      </div>

      {/* Expiry */}
      <div className="col-span-2 text-center">
        <p className="text-sm font-medium">{expiryDate}</p>
      </div>

      {/* Status */}
      <div className="col-span-1 justify-self-center">
        {user.status === '1' ? (
          <div className="badge badge-info">Active</div>
        ) : (
          <div className="badge badge-error">Inactive</div>
        )}
      </div>

      {/* Actions */}
      <div className="col-span-2 flex flex-col items-center gap-2 xl:flex-row xl:justify-center">
        {/* <Link
          href={`/xoomadmin/users/update/${user._id}`}
          className="btn btn-sm btn-warning rounded-md "
        >
          <MdEditNote className="text-xl" />
        </Link> */}

        <button
          className="btn btn-sm btn-error rounded-md"
          onClick={() => deleteUsersModalHandler(user)}
        >
          <ImBin className="text-xl" />
        </button>
      </div>
    </div>
  );
}
