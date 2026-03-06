"use client";
import { Copy, Eye, EyeClosed, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import useAuthStore from "../../../store/useAuthStore";
import { apiKeyCreation } from "../../lib/user";
import { toast, ToastContainer } from "react-toastify";

export default function SettingsPage() {
  const [showKey, setShowKey] = useState(false);
  const [generating, setGenerating] = useState(false);
  const {token, fetchProfile, user} = useAuthStore()
  const hasApiKey = user && user?.apiKey;
  async function handleGenerateApiKey() {
    setGenerating(true);
    try{
        const res = await apiKeyCreation(token);
        if (res?.error) {
            toast.error(res?.error);
            throw Error(res?.error)
        }
        toast.success(res?.msg);
    } catch (error) {
        console.log(error)
    } finally {
        setGenerating(false);
    }
  }
  function handleCopyKey() {
    toast.success("Copied to clipboard");
    navigator.clipboard.writeText(user?.apiKey);
  }

  useEffect(() => {
    fetchProfile(token)
  }, [token, fetchProfile])
  
  return (
    <div className="p-4 w-full">
        <ToastContainer />
      <h2 className="text-2xl font-bold">Settings Page</h2>
      <div className="w-full flex flex-col items-center bg-base text-white rounded-md py-5 mt-4">
        <div className="flex gap-4">
          {hasApiKey ? (
            <>
              <p className="py-2">Api Key:</p>
              <input
                type={showKey ? "text" : "password"}
                value={hasApiKey ? user?.apiKey : ""}
                className="outline-none w-107.5"
                disabled
              />
              <button 
              onClick={handleCopyKey}
              className="btn btn-info" title="Copy Api Key">
                <Copy />
              </button>
              <button
                title={showKey ? "Show Api Key" : "Hide Api Key"}
                onClick={() => setShowKey((prev) => !prev)}
                className="hover:cursor-pointer btn btn-circle"
              >
                {showKey ? <Eye /> : <EyeClosed />}
              </button>
              <button title={"Delete Api Key"} className="btn btn-error">
                <Trash2Icon />
              </button>
            </>
          ) : (
            <button onClick={handleGenerateApiKey} disabled={generating} className="btn btn-soft btn-success text-white">{generating? <span className="loading loading-spin loading-lg"></span> :"Generate API Key"}</button>
          )}
        </div>
      </div>
    </div>
  );
}
