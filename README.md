# Começando com o Firebase

**-- 1 Iniciando projeto --**

1.1 - Instalar o firebase no seu projeto: ` npm i firebase `

1.2 - Integrar firebase no seu projeto: ` Adicione um app web no seu projeto e copie os SDKs para uma pasta src/firebase/config.js do seu projeto`

1.3 - Configure o banco de dados: `const db = getFirestore(app)`
# O método getFireStore precisa ser importado de firebase/firestore

1.4 - Exporte o banco de dados: `export { db }`

------------------------------------------------------------

**-- 2 Hook de authentication --**

2.1 - Criar um hook e importar a dependência: `getAuth` do firebase/auth

2.2 - importar db da pasta firebase/config

2.3 Criar varivel auth: `const auth = getAuth()`

**-- 3 Registro de usuário --**

3.1 - criar função *createUser* e importar as dependências: `createUserWithEmailAndPassword, updateProfile`

3.2 - criar variável com o hook createUserWithEmailAndPassword, utilizar a variável auth e os outros dados do usuário: 
`const {user} = await createUserWithEmailAndPassword(auth, data.email, data.password)`

3.3 - fazer atualização do usuário no banco de dados: `await updateProfile(user, {displayName: data.name})`
*displayName já é padrão do sistema*

3.4 - Retornar `user` no fim da função

<!-- createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut -->
-------------------------------------------------------------

**-- 4 Logout --**

4.1 - Importar hook signOut: `import {signOut} from "firebase/auth"`

4.2 - Criar função logout: `const logout = () => {}`

4.3 - Adicionar à função o hook *signOut* passando *auth* como parâmetro: `const logout = () => { signOut(auth) }`

4.4 - Exportar função no final do hook

-------------------------------------------------------------

**-- 5 Login --**

5.1 - Importar o hook *signInWithEmailAndPassword*: `import {signInWithEmailAndPassword} from "firebase/auth"`

5.2 - Criar função de login assíncrona com o parâmetro data

5.3 - adicionar à função o hook *signInWithEmailAndPassword* passando os parâmetros de autenticação, email e senha:

`const signIn = async (data) => {`
`    await signInWithEmailAndPassword(auth, data.name, data.password)`
`}`

5.4 - Exportar função no final do hook

-------------------------------------------------------------

**-- 6 Utilizar autenticação no App --**

6 .1 - Importar a dependência onAuthStateChanged: `import {onAuthStateChanged} from "firebase/auth"`

6 .2 - Importar o hook de autenticação criado anteriormente e utilizar a variável *auth*: `const {auth} = useAuthentication()`

6 .3 - Criar uma variável user atribuir o valor undefined: `const [user, setUser] = useState(undefined)`

6 .4 - Fazer verificação lógica para loading do usuário: 

`const loadingUser = user === undefined`
`if(loadingUser){return <p>Carregando...</p>}`

6.5 - Mapear o usuário para saber se está autenticado ou não:

`   useEffect(()=>{`
`      onAuthStateChanged(auth, (user) => setUser(user))`
`   },[auth])`

6.6 - Utilizar user no value do context do App.js: `<AuthProvider value{{user}}>...</AuthProvider>`

-------------------------------------------------------------

**-- 7 Inserção de dados --**

7.1 - Importar db

7.2 - Importar hooks do firebase: `import {Collection, addDoc, Timestamp} from "firebase/firestore"`

7.3 - Criar hook com o parâmetro da collection: `export const useInsertDocument = (docCollection) => {}`

7.4 - Criar uma função insertDocument dentro do hook: 

`const insertDocument = async (document) = {`

`}`

7.5 - Criar documento em uma variável com os dados recebidos

`const insertDocument = async (document) = {`
    `const newDocument = {...document, timestamp.now() }`
`}`

7.6 - Inserir documento à collection: 

`const insertDocument = async (document) = {`
    `const newDocument = {...document, timestamp.now() }`
    `await addDoc(collection(db, docCollection), newDocument)`
`}`

7.7 - Criar banco de dados na firebase

7.7 - Retornar insertDocument no final do hook

-------------------------------------------------------------

**-- 8 Requisição de dados --**

8.1 - Importar os hooks do firebase: `import {collection, query, orderBy, onSnapshot, where} from "firebase/firestore"`

8.2 - Importar o db

8.3 - Criar função principal do hook com o parâmetro da collection: 
`export const useGetInfo = (docCollection) => {}`

8.4 - Criar useEffect com docCollection como variável de dependência

8.5 - Criar uma referência da collection: `const collectionRef = await collection(db, docCollection)`

8.6 - Usar o query inserindo como parâmetro collectionRef e orderBy (opcional) dentro de uma variável: 
`export const useGetInfo = (docCollection) => {`
    `const collectionRef = await collection(db, docCollection)`
    `let q = await query(collectionRef, orderBy("createAt", "desc"))`
`}`

8.7 - Usar o where quando for fazer uma requisição *onde o dado é igual a alguma coisa*:
`export const useGetInfo = (docCollection) => {`
    `const collectionRef = await collection(db, docCollection)`
    `let q = await query(collectionRef, where("uid", "==", IdUser) ,orderBy("createAt", "desc"))`
`}`

8.8 - Criar snapshot com a variável criada com query e adicionar a um state de dados: 
`await onSnapshot(q, (querySnapshot) => {`
    `setData(`
    `querySnapshot.docs.map(doc =>({`
        `id: doc.id`
        `...doc.data()`
    `}))`
    `)`
`})`