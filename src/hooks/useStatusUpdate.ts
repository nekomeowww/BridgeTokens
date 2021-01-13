import { useCallback } from 'react'
import axios from 'axios'

import { getStore } from "../services/storeService";

let intervalId: any = null
const useStatusUpdate = (id: string) => {
const store = getStore();
  const handleStatusUpdate = useCallback(async () => {
    intervalId = setInterval(() => {
        axios.get(process.env.REACT_APP_API + '/contract/status', { params: { id: id } }).then(res => {
            if (res.data.code < 0) {
                console.error(res.data.message)
                store.set("confirming", false)
                store.set("validatorError", true)
                clearInterval(intervalId)
                return
            }
            else if (res.data.code === 1009) {
                const txID = res.data.outcomeData.transactionHash
                store.set("destTxID", txID);
                store.set("confirming", false);
                store.set("transferSuccess", true);
                clearInterval(intervalId)
                return
            }
        })
        
    }, 1000)
  }, [id, store])

  return { onStatusUpdate: handleStatusUpdate }
}

export default useStatusUpdate
