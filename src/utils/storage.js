/**
 * Set Async Storage
 *
 * @param {Object} api - Latest api store object
 * @param {string} tag - Endpoint tag name
 * @param {string} id - Tag id
 *
 * @return {(*|null)}
 */
export const getApiCachedData = (api, tag, id) => {
  const provided = api?.provided?.[tag]?.[id]

  if (provided && provided?.length > 0) {
    const cacheName = provided[provided.length - 1]
    const data = api?.queries?.[cacheName]?.data

    if (data) {
      return data
    }
  }

  return null
}
