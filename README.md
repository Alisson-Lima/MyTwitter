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

**-- Utilizar autenticação no App --**

1.1 - Importar a dependência onAuthStateChanged: `import {onAuthStateChanged} from "firebase/auth"`

1.2 - Importar o hook de autenticação criado anteriormente e utilizar a variável *auth*: `const {auth} = useAuthentication()`

1.3 - Criar uma variável user atribuir o valor undefined: `const [user, setUser] = useState(undefined)`

1.4 - Fazer verificação lógica para loading do usuário: 

`const loadingUser = user === undefined`
`if(loadingUser){return <p>Carregando...</p>}`

1.5 - Mapear o usuário para saber se está autenticado ou não:

`   useEffect(()=>{`
`      onAuthStateChanged(auth, (user) => setUser(user))`
`   },[auth])`

1.6 - Utilizar user no value do context do App.js: `<AuthProvider value{{user}}>...</AuthProvider>`

-------------------------------------------------------------

