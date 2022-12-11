import { db } from "./firebase.js"
import {
    getDocs,
    collection,
    setDoc,
    getDoc,
    doc,
    orderBy,
    query,
    limit
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'


export async function getScores() {
    const scoresSnapshot = await getDocs(collection(db, 'scores'))
    const scores = scoresSnapshot.docs.map(doc => doc.data())

    return scores
}

export async function submitScore(name, score) {
    let now = new Date()
    now = now.getTime()

    console.log(name, score)

    let previousResult = await getDoc(doc(db, 'scores', name))
    previousResult = previousResult.data()

    if (!previousResult) {
        await setDoc(doc(db, "scores", name), {
            name: name,
            score: score,
            timestamp: now
        })
    } else if (previousResult.score < score) {
        await setDoc(doc(db, "scores", name), {
            name: name,
            score: score,
            timestamp: now
        })
    }
}

export async function getBestScores(amount = 5) {
    const q = query(collection(db, 'scores'), orderBy('score', 'desc'), limit(amount))

    const result = await getDocs(q)

    const scores = result.docs.map((doc) => {
        return doc.data()
    })

    return scores
}