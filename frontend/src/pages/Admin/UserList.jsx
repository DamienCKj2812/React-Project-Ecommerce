import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaTimes, FaCheck } from 'react-icons/fa';
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation,} from "../../redux/api/userApiSlice";
import Message from '../../components/Message';

const UserList = () => {
    //1)data: users - This extracts the data property from the query result and assigns it to a variable named users. This is likely to represent the fetched user data.
    //2)refetch - this manually trigger a refetch of a particular query. This can be helpful when you want to refresh the data in response
    //          it knows which data to refresh because it is linked to a specific query, and that query definition provides information about the cache tags associated with the data. 
    //3)isLoading - isLoading is true,  It indicates whether a query is currently in progress, it means that the query is currently fetching data from the server.
    //4)error - show all the error
    const {data: users, refetch, isLoading, error} = useGetUsersQuery(); 
    const [deleteUser] = useDeleteUserMutation();
    const [updateUser] = useUpdateUserMutation();

    const [editableUserId, setEditableUserId] = useState(null);
    const [editableUserName, setEditableUserName] = useState("");
    const [editableUserEmail, setEditableUserEmail] = useState("");

    useEffect(() => {
        refetch();
    }, [refetch]);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteUser(id);
            } catch (error) {
                toast.error(error.data.message || error.error)
            }
        }
    }

    const toggleEdit = (id, username, email) => {
        setEditableUserId(id);
        setEditableUserName(username);
        setEditableUserEmail(email);
    }

    const updateHandler = async (id) => {
        try {
            await updateUser({
                userId : id,
                username: editableUserName,
                email: editableUserEmail
            })

            setEditableUserId(null);
            refetch();
            
        } catch (error) {
            toast.error(error.dat.message || error.error)
        }
    }

    return <div className="0-4">
        {isLoading ? (
            <Loader />
        ) : error ? ( 
            <Message variant='danger'>
                {error?.data.message || error.message}
            </Message>
            ) : (
                <div className="flex flex-col md:flex-row">
                    {/* </AdminMenu /> */}
                    <table className="w-full md:2-4/5 mx-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">NAME</th>
                                <th className="px-4 py-2 text-left">EMAIL</th>
                                <th className="px-4 py-2 text-left">ADMIN</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td className="px-4 py-2">{user._id}
                                    </td>
                                    
                                    <td className="px-4 py-2">
                                        {editableUserId === user._id ? ( 
                                            <div className="flex itms-center">
                                                <input type="text" value={editableUserName} onChange={e => 
                                                    setEditableUserName(e.target.value)} className="w-full p-2 border rouded-lg"/>

                                                <button onClick={() => updateHandler(user._id)} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg">
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex itens-center">
                                                {user.username} {" "}
                                                <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                                                    <FaEdit className="ml-[1rem]" />
                                                </button>
                                            </div>
                                        )}
                                    </td> 

                                    <td className="px-4 py-2">
                                        {editableUserId == user._id ? (
                                            <div className="flex items-center">
                                                <input type="text" value={editableUserEmail} onChange={e => setEditableUserEmail(e.target.value)} className="w-full p-2 border rounded-lg"/>
                                                <button onChange={() => updateHandler(user._id)} className="ml-2 bg-blue 500 text-white py-2 px-4 rounded-lg">
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex-items-center">
                                                <p>{user.email}</p>
                                            <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                                                <FaEdit className="ml-[1rem]" />
                                            </button>
                                            </div>
                                        )}
                                    </td>

                                    <td className="px-4 py-2">
                                        {user.isAdmin ? (
                                            <FaCheck style={{color: 'green'}} />
                                        ) : (
                                            <FaTimes style={{color: 'red'}} />
                                        )}
                                    </td>

                                    <td className="px-4 py-2">
                                        {!user.isAdmin && (
                                            <div className="flex">
                                                <button onClick={() => deleteHandler(user._id)} 
                                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                    <FaTrash />
                                                </button>

                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        }
    </div>
}

export default UserList