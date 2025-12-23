import { ImBin } from 'react-icons/im';

export default function UsersGridView({ user, deleteUsersModalHandler }) {
  const expiryDate = user?.expiresAt
    ? new Date(user.expiresAt * 1000).toLocaleDateString()
    : 'N/A';

  return (
    <div className="grid grid-cols-1 items-center justify-items-center gap-4 rounded-md border p-4">
      {/* Image */}
      <img
        src={user?.image || '/icons/user-black.png'}
        alt="User Image"
        className="h-32 w-40 rounded-md object-cover"
      />

      {/* Phone */}
      <div className="text-center">
        <p className="text-lg font-semibold">Phone: {user.phone || 'N/A'}</p>
        <p className="text-sm text-gray-500">Ref: {user.reference || 'N/A'}</p>
      </div>

      {/* Membership */}
      <div className="text-center">
        <p className="font-medium">{user.membershipPlan || 'N/A'}</p>
        <p
          className={`text-sm font-semibold ${
            user.paid ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {user.paid ? 'Paid' : 'Unpaid'}
        </p>
      </div>

      {/* Expiry */}
      <div className="text-center text-sm">
        <span className="font-medium">Expires:</span> {expiryDate}
      </div>

      {/* Status */}
      <div>
        {user.status === '1' ? (
          <div className="badge badge-info">Active</div>
        ) : (
          <div className="badge badge-error">Inactive</div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {/* <Link
          href={`/xoomadmin/users/update/${user._id}`}
          className="btn btn-sm btn-warning"
        >
          Edit <MdEditNote className="text-xl" />
        </Link> */}

        <button
          className="btn btn-sm btn-error"
          onClick={() => deleteUsersModalHandler(user)}
        >
          Delete <ImBin className="text-xl" />
        </button>
      </div>
    </div>
  );
}
