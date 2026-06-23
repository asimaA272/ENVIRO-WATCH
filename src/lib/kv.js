let kv = null

async function getKV() {
  if (kv) return kv
  try {
    const mod = await import('@vercel/kv')
    kv = mod.kv
    return kv
  } catch {
    return null
  }
}

export async function kvGet(key) {
  try {
    const client = await getKV()
    if (!client) return null
    return await client.get(key)
  } catch {
    return null
  }
}

export async function kvSet(key, value, opts = {}) {
  try {
    const client = await getKV()
    if (!client) return false
    if (opts.ex) {
      await client.set(key, value, { ex: opts.ex })
    } else {
      await client.set(key, value)
    }
    return true
  } catch {
    return false
  }
}

export async function kvIncr(key) {
  try {
    const client = await getKV()
    if (!client) return 0
    return await client.incr(key)
  } catch {
    return 0
  }
}

export async function kvLpush(key, ...values) {
  try {
    const client = await getKV()
    if (!client) return 0
    return await client.lpush(key, ...values)
  } catch {
    return 0
  }
}

export async function kvLrange(key, start, stop) {
  try {
    const client = await getKV()
    if (!client) return []
    return await client.lrange(key, start, stop)
  } catch {
    return []
  }
}

export async function kvKeys(pattern) {
  try {
    const client = await getKV()
    if (!client) return []
    return await client.keys(pattern)
  } catch {
    return []
  }
}
