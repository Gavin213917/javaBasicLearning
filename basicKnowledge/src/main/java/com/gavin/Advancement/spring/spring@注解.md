## spring

#### 1、核心注解

##### 1、@Required

用于Bean的Setter方法上，以指示该Bean组装时必须要有该属性，否则抛出BeanInitializationException

##### 2、@Autowired

自动导入依赖的bean。byType方式。把配置好的Bean拿来用，完成属性、方法的组装。 它可以对类成员变量、方法及构造函数进行标注，完成自动装配的工作。
当加上（required=false）时，就算找不到bean也不报错。

JSR规范中也有相对应的注解：JSR250的@Resource，JSR330的@Inject

```java
import org.springframework.beans.factory.annotation.Autowired;

public class TextEditor {
   private SpellChecker spellChecker;
   @Autowired
   public void setSpellChecker( SpellChecker spellChecker ){
      this.spellChecker = spellChecker;
   }
   public SpellChecker getSpellChecker( ) {
      return spellChecker;
   }
   public void spellCheck() {
      spellChecker.checkSpelling();
   }
}
public class SpellChecker {
   public SpellChecker(){
      System.out.println("Inside SpellChecker constructor." );
   }
   public void checkSpelling(){
      System.out.println("Inside checkSpelling." );
   }  
}
```

@Resource

@Resource的作用相当于@Autowired

只不过@Autowired按byType自动注入，

而@Resource默认按 byName自动注入罢了。

@Resource有两个属性是比较重要的，分是name和type，Spring将@Resource注解的name属性解析为bean的名字，而type属性则解析为bean的类型。所以如果使用name属性，则使用byName的自动注入策略，而使用type属性时则使用byType自动注入策略。如果既不指定name也不指定type属性，这时将通过反射机制使用byName自动注入策略。

**@Resource装配顺序:**

> 1、如果同时指定了name和type，则从Spring上下文中找到唯一匹配的bean进行装配，找不到则抛出异常
> 2、如果指定了name，则从上下文中查找名称（id）匹配的bean进行装配，找不到则抛出异常
> 3、如果指定了type，则从上下文中找到类型匹配的唯一bean进行装配，找不到或者找到多个，都会抛出异常
> 4、如果既没有指定name，又没有指定type，则自动按照byName方式进行装配；如果没有匹配，则回退为一个原始类型进行匹配，如果匹配则自动装配；

##### 3、@Qualifier

这个注解通常和@Autowired一起使用，当你想对注入的过程做更多的控制，@Qualifier可以帮助你指定做更详细配置。 一般在两个或者多个bean是相同的类型，spring在注入的时候会出现混乱。

```java
@Component
public class Bean1 implements HelloInterface {
  //
}

@Component
public class Bean2 implements HelloInterface {
  //
}
如果我们只使用@Autowired注解，Spring就不知道到底要注入哪一个bean。
解决办法就是加上@Qualifier注解

@Component
public class BeanA {

  @Autowired
  @Qualifier("bean2")
  private HelloInterface dependency;
```

**@Qualifier**

适用于bean属性setter方法，并表示受影响的bean属性必须在XML配置文件在配置时进行填充。否则，容器会抛出一个BeanInitializationException异常。

@Qualifier

当你创建多个具有相同类型的 bean 时，并且想要用一个属性只为它们其中的一个进行装配，在这种情况下，你可以使用 @Qualifier 注释和 @Autowired 注释通过指定哪一个真正的 bean 将会被装配来消除混乱哦。

##### 4、@Configuration

等同于spring的XML配置文件；使用Java代码可以检查类型安全。 如果有些第三方库需要用到xml文件，建议仍然通过@Configuration类作为项目的配置主类，
并使用@ImportResource注解加载xml配置文件

```java
加载配置文件

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

@Configuration
@ImportResource(locations={"classpath:applicationContext.xml"})
public class XmlConfiguration {
}
配置Bean

@Configuration
public class DataConfig{ 
  @Bean
  public DataSource source(){
    DataSource source = new OracleDataSource();
    source.setURL();
    source.setUser();
    return source;
  }
  @Bean
  public PlatformTransactionManager manager(){
    PlatformTransactionManager manager = new BasicDataSourceTransactionManager();
    manager.setDataSource(source());
    return manager;
  }
}
```

##### 5、@ComponentScan

与@Configuration注解一起，发现和装配Bean。 可通过basePackageClasses 或basePackage指定扫描的基类或基包。
如果声明的包未定义的话，会从声明该注解的类所在的包及子包开始扫描

```java
@Configuration
@ComponentScan(
  basePackages = {"guru.springframework.blog.componentscan.example.demopackageA","guru.springframework.blog.componentscan.example.demopackageD","guru.springframework.blog.componentscan.example.demopackageE"},
  basePackageClasses = DemoBeanB1.class
)
public class BlogPostsApplicationWithComponentScan {
    public static void main(String[] args) {
    }
}
```

##### 6、@Bean

等价于XML中配置的bean。 放在方法的上面，而不是类，产生一个Bean,并交给Spring容器管理。

```java
@Configuration
public class AppConfig{
  @Bean
  public Person person(){
    return new Person(address());
  }
  @Bean
  public Address address(){
    return new Address();
  }
}
```

##### 7、@Lazy

用在组件类上。Spring默认在启动时自动装载依赖类。使用此注解时，会在第一次请求使用时才初始化该类。 也可与@Configuration一起使用，则所有@Bean注解的方法会延时初始化。

##### 8、@Value

可用于字段，构造器参数，方法参数，以指示一个默认的值。 支持#{...}和${...}这两种占位符。
注入Spring boot application.properties配置的属性的值

```java
@Value(value = “#{message}”)
private String message;
```

##### 9、@Import

用来导入其他配置类

##### 10、@ImportResource

用来加载xml配置文件

##### 11、@PostConstruct

用来标记是在项目启动的时候执行这个方法。用来修饰一个非静态的void()方法

也就是spring容器启动时就执行，多用于一些全局配置、数据字典之类的加载

被@PostConstruct修饰的方法会在服务器加载Servlet的时候运行，并且只会被服务器执行一次。PostConstruct在构造函数之后执行,init()方法之前执行。PreDestroy（）方法在destroy()方法执行执行之后执

##### 12、@PreDestroy

被@PreDestroy修饰的方法会在服务器卸载Servlet的时候运行，并且只会被服务器调用一次，类似于Servlet的destroy()方法。被@PreDestroy修饰的方法会在destroy()方法之后运行，在Servlet被彻底卸载之前

#### 2、原型注解

##### 1、@Component

可配合CommandLineRunner使用，在程序启动后执行一些基础任务; 当组件不好归类的时候，可以使用这个注解进行标注，加入spring IOC 容器中，通用类注解

##### 2、@Controller

用于定义控制器类，在spring 项目中由控制器负责将用户发来的URL请求转发到对应的服务接口（service层）， 一般这个注解在类中，通常方法需要配合注解@RequestMapping

```java
@Controller
@RequestMapping(“/demoInfo”)
publicclass DemoController {
    @Autowired
    private DemoInfoService demoInfoService;

    @RequestMapping("/hello")
    public String hello(Map<String,Object> map){
        System.out.println("DemoController.hello()");
        map.put("hello","from TemplateController.helloHtml");
        //会使用hello.html或者hello.ftl模板进行渲染显示.
        return"/hello";
    }
}
```

##### 3、@Service

一般用于修饰service层的组件

##### 4、@Repository

可以确保DAO或者repositories提供异常转译， 这个注解修饰的DAO或者repositories类会被ComponetScan发现并配置，
同时也不需要为它们提供XML配置项

##### 5、@Component

我们一般使用 @Autowired 注解让 Spring 容器帮我们自动装配 bean。要想把类标识成可用于 @Autowired 注解自动装配的 bean 的类,可以采用以下注解实现：

- @Component ：通用的注解，可标注任意类为 Spring 组件。如果一个 Bean 不知道属于哪个层，可以使用@Component 注解标注。
- @Repository : 对应持久层即 Dao 层，主要用于数据库相关操作。
- @Service : 对应服务层，主要涉及一些复杂的逻辑，需要用到 Dao 层。
- @Controller : 对应 Spring MVC 控制层，主要用户接受用户请求并调用 Service 层返回数据给前端页面。

#### 3、SpringBoot注解

##### 1、@EnableAutoConfiguration

自动配置。尝试根据你添加的jar依赖自动配置你的Spring应用。 例如，如果classpath下存在HSQLDB，并且你没有手动配置任何数据库连接beans，将自动配置一个内存型（in-memory）数据库”。
你可以将@EnableAutoConfiguration或@SpringBootApplication注解添加到一个@Configuration类上来选择自动配置。
如果发现应用了你不想要的特定自动配置类，可使用@EnableAutoConfiguration注解的排除属性来禁用它们

##### 2、@SpringBootApplication

包含了@ComponentScan、@Configuration和@EnableAutoConfiguration注解 其中@ComponentScan让spring Boot扫描到Configuration类并把它加入到程序上下文

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

@SpringBootApplication 注解说一下，虽然我们一般不会主动去使用它。

> 注：这个注解是 Spring Boot 项目的基石，创建 SpringBoot 项目之后会默认在主类加上。

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p3.pstatp.com/large/pgc-image/d324e4e99cf64654ba2c279539355f3c)



我们可以把 @SpringBootApplication看作是 @Configuration、@EnableAutoConfiguration、@ComponentScan 注解的集合。

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p1.pstatp.com/large/pgc-image/48b754193eb04ffaaeb9c00d5019f25c)



根据 SpringBoot 官网，这三个注解的作用分别是：

- @EnableAutoConfiguration：启用 SpringBoot 的自动配置机制
- @ComponentScan： 扫描被@Component (@Service,@Controller)注解的 bean，注解默认会扫描该类所在的包下所有的类。
- @Configuration：允许在 Spring 上下文中注册额外的 bean 或导入其他配置类

#### 4、SpringCloud注解

##### 1、@EnableConfigServer

配置服务器

##### 2、@EnableEurekaServer

注册服务器

##### 3、@EnableDiscoveryClient

发现客户端

##### 4、@EnableCircuitBreaker

熔断器

##### 5、@HystrixCommand

服务降级

```java
@Service
public class BookService{
    private final RestTemplate restTemplate; 
    public BookService(RestTemplate rest){
      this.restTemplate =   rest;
    }                                           
  @HystrixCommand(fallbackMethod = "newList")                                                                     public String bookList(){
    URI uri = URI.create("http://localhost:8081/recommended");                                                      return this.restTemplate.getForObject(uri, String.class);  
  }
  public String newList(){
    return "Cloud native Java";
  }
}
```

#### 5、缓存注解

##### 1、@Cacheable

方法级

```java
@Cacheable("addresses")
public String getAddress(Book book){...}
```

@Cacheable

用来标记缓存查询。可用用于方法或者类中，当标记在一个方法上时表示该方法是支持缓存的，当标记在一个类上时则表示该类所有的方法都是支持缓存的。

参数列表

![Spring中的18个注解，你会几个？](http://p1.pstatp.com/large/pgc-image/7946ad2b8cc84e439f4e81f4e46c68b1)

比如@Cacheable(value="UserCache") 标识的是当调用了标记了这个注解的方法时，逻辑默认加上从缓存中获取结果的逻辑，如果缓存中没有数据，则执行用户编写查询逻辑，查询成功之后，同时将结果放入缓存中。

但凡说到缓存，都是key-value的形式的，因此key就是方法中的参数（id），value就是查询的结果，而命名空间UserCache是在spring*.xml中定义.

![Spring中的18个注解，你会几个？](http://p3.pstatp.com/large/pgc-image/59991ee8c732481b8547c9ea4750d31b)

##### 2、@CachePut

方法级，更新缓存

```java
@CachePut("addresses")
public String getAddress(Book book){...}
```

##### 3、@CacheEvict

方法级，清除缓存

```java
@CacheEvict(value="addresses", allEntries="true")
public String getAddress(Book book){...}
```

@CacheEvict

用来标记要清空缓存的方法，当这个方法被调用后，即会清空缓存。@CacheEvict(value=”UserCache”)

参数列表

![Spring中的18个注解，你会几个？](http://p1.pstatp.com/large/pgc-image/c771f91f00c048e18c47186a22734828)

##### 4、@CacheConfig

在类级别配置缓存，以避免多次声明

```java

```

#### 6、任务执行和调度注解

##### 1、@Scheduled

方法级，具有该注解的方法应无返回值，且不接受任何参数

```java
@Scheduled(fixedDelay=5000)
public void doSomething() {
  // something that should execute periodically   
}
@Scheduled(initialDelay=1000,fixedRate=5000)
public void doSomething() { 
 // something that should execute periodically after an initial delay  
}
```

##### 2、@Async

方法级，每个方法均都在单独的线程中，可接受参数；可返回值，也可不返回值。

#### 7、测试注解

##### 1、@BootstrapWith

类级别，配置Spring测试上下文框架的启动

##### 2、@ContextConfiguration

类级别，指定配置文件

```java
@ContextConfiguration(locations={"example/test-context.xml", loader = Custom ContextLoader.class})
```

##### 3、@WebAppConfiguration

类级别，指示ApplicationContext加载的集成测试环境应为WebApplicationContext

```java
默认web应用程序的根路径为 src/main/webapp
可通过以下覆盖

<code class="EnlighterJSRAW" data-enlighter-language="java" data-enlighter-theme="git">@WebAppConfiguration</code>
```

##### 4、@Timed

指定测试方法的执行时间，超时失败

```java
@Timed(millis=10000)
public void testLongRunningProcess() {  ... }
```

##### 5、@Repeat

运行次数

```java
@Repeat(10)
@Test
public void testProcessRepeatedly() {  ... }
```

##### 6、@Commit

类级和方法级，指示事务的提交

##### 7、@RollBack

类级和方法级，指示事务的回滚

##### 8、@DirtiesContext

类级和方法级，指示ApplicationContext已修改，触发重加载以进行后续的测试

支持3种关闭上下文的方式

BEFORE_METHOD

BEFORE_CLASS

BEFORE_EACH_TEST_METHOD

##### 9、@BeforeTransaction

测试类的void方法上，指示具有该注解的方法应该在所有@Transactional注解的方法之前执行

##### 10、@AfterTransaction

测试类的void方法上，指示具有该注解的方法应该在所有@Transactional注解的方法之后执行

##### 11、@Sql

类级和方法级，运行Sql脚本 方法上的@Sql会覆盖类级别的@Sql

```java
import java.util.List;

import javax.sql.DataSource;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TestName;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
@Sql({ "drop_schema.sql", "schema.sql", "data.sql" })
public class SpringSqlAnnotationExample {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Rule
    public TestName testName = new TestName();

    @Before
    public void printTestName() {
        System.out.println(testName.getMethodName());
    }

    @Test
    public void printRows() {
        List empNames = jdbcTemplate.queryForList("select name from employee",
                String.class);
        assertEquals(2, empNames.size());
        System.out.println(empNames);
    }

    @Test
    @Sql("drop_schema.sql")
    @Sql({ "schema.sql", "override_data.sql" })
    public void overrideSqlAndPrintRows() {
        List empNames = jdbcTemplate.queryForList("select name from employee",
                String.class);
        assertEquals(3, empNames.size());
        System.out.println(empNames);
    }

    @Configuration
    static class Config {

        @Bean
        public DataSource dataSource() {
            return new EmbeddedDatabaseBuilder()//
            .setName("empty-sql-scripts-without-tx-mgr-test-db")//
            .build();
        }

        @Bean
        public JdbcTemplate jdbcTemplate() {
            return new JdbcTemplate(dataSource());
        }
    }
}
```

##### 12、@SqlConfig

同@Sql一起工作，定义了如何解析和执行SQL脚本的元数据 用于类级时对该类下的所有脚本起作用

```java
@RunWith(SpringJUnit4ClassRunner.class)  
@FixMethodOrder(MethodSorters.NAME_ASCENDING)  
@ContextConfiguration(value = "classpath:spring-datasource.xml")  
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)  
public class MethodLevelSqlTest {  
    private JdbcTemplate jdbcTemplate1;  
    private JdbcTemplate jdbcTemplate2;  
    @Autowired  
    @Qualifier("dataSource1")  
    public void setDataSource1(DataSource dataSource1) {  
        this.jdbcTemplate1 = new JdbcTemplate(dataSource1);  
    }  
    @Autowired  
    @Qualifier("dataSource2")  
    public void setDataSource2(DataSource dataSource2) {  
        this.jdbcTemplate2 = new JdbcTemplate(dataSource2);  
    }  


    @Test  
    @Sql(value = {"classpath:schema.sql", "classpath:init-data.sql", "classpath:updated-data.sql"},  
            config =  
            @SqlConfig(encoding = "utf-8", separator = ";", commentPrefix = "--",  
                    dataSource = "dataSource1", transactionManager = "txManager1"))  
    public void test01_simple() {  
        Assert.assertEquals(  
                Integer.valueOf(3),  
                jdbcTemplate1.queryForObject("select count(1) from users", Integer.class));  
    }  


    @Test  
    @Sql(value = {"classpath:schema.sql", "classpath:init-data.sql"},  
            config =  
            @SqlConfig(encoding = "utf-8", separator = ";", commentPrefix = "--",  
                    dataSource = "dataSource2", transactionManager = "txManager2"))  
    public void test02_simple() {  
        Assert.assertEquals(  
                Integer.valueOf(2),  
                jdbcTemplate2.queryForObject("select count(1) from users", Integer.class));  
    }  

}  
```

##### 13、@SqlGroup

方法级，包含多个@Sql

##### 14、@SpringBootTest

用于启动集成测试上下文

```java
添加Maven依赖
<properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>1.5.6.RELEASE</version>
    </parent>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
编写启动入口类
@SpringBootApplication
public class StartUpApplication {
    public static void main(String[] args) {
        SpringApplication.run(StartUpApplication.class, args);
    }
}
编写Controller类
@RestController
public class HelloController {

    @RequestMapping("/")
    public String index() {
        return "Hello Spring Boot,Index!";
    }

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String test() {
        return "Spring Boot Test Demo!";
    }
编写测试类
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StartUpApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class HelloControllerTest {

    /**
     * @LocalServerPort 提供了 @Value("${local.server.port}") 的代替
     */
    @LocalServerPort
    private int port;

    private URL base;

    @Autowired
    private TestRestTemplate restTemplate;

    @Before
    public void setUp() throws Exception {
        String url = String.format("http://localhost:%d/", port);
        System.out.println(String.format("port is : [%d]", port));
        this.base = new URL(url);
    }

    /**
     * 向"/test"地址发送请求，并打印返回结果
     * @throws Exception
     */
    @Test
    public void test1() throws Exception {

        ResponseEntity<String> response = this.restTemplate.getForEntity(
                this.base.toString() + "/test", String.class, "");
        System.out.println(String.format("测试结果为：%s", response.getBody()));
    }
其中，classes属性指定启动类，SpringBootTest.WebEnvironment.RANDOM_PORT经常和测试类中@LocalServerPort一起在注入属性时使用。会随机生成一个端口号。
你会发现，随着Spring boot版本的提升，单元测试变得更简单了。
```

##### 15、@DataJpaTest

用于替代@SpringBootTest进行测试JPA Repositories， 测试时使用H2等内存数据库

##### 16、@DataMongoTest

提供最小化的自动配置和一个内置的MongoDB以进行集成测试

```java
1.设置Maven依赖
设置项目的Maven父

<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.0.3.RELEASE</version>
    <relativePath /> <!-- lookup parent from repository -->
</parent>
Spring对MongoDB的支持

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>
嵌入式的MongoDB

<dependency>
    <groupId>de.flapdoodle.embed</groupId>
    <artifactId>de.flapdoodle.embed.mongo</artifactId>
    <scope>test</scope>
</dependency>
2.自动配置测试

@DataMongoTest
@ExtendWith(SpringExtension.class)
public class MongoDbSpringIntegrationTest {
    @DisplayName("given object to save"
        + " when save object using MongoDB template"
        + " then object is saved")
    @Test
    public void test(@Autowired MongoTemplate mongoTemplate) {
        // given
        DBObject objectToSave = BasicDBObjectBuilder.start()
            .add("key", "value")
            .get();

        // when
        mongoTemplate.save(objectToSave, "collection");

        // then
        assertThat(mongoTemplate.findAll(DBObject.class, "collection")).extracting("key")
            .containsOnly("value");
    }
}
3.手动配置测试

class ManualEmbeddedMongoDbIntegrationTest {
    private MongodExecutable mongodExecutable;
    private MongoTemplate mongoTemplate;

    @AfterEach
    void clean() {
        mongodExecutable.stop();
    }

    @BeforeEach
    void setup() throws Exception {
        String ip = "localhost";
        int port = 27017;

        IMongodConfig mongodConfig = new MongodConfigBuilder().version(Version.Main.PRODUCTION)
            .net(new Net(ip, port, Network.localhostIsIPv6()))
            .build();

        MongodStarter starter = MongodStarter.getDefaultInstance();
        mongodExecutable = starter.prepare(mongodConfig);
        mongodExecutable.start();
        mongoTemplate = new MongoTemplate(new MongoClient(ip, port), "test");
    }

    @DisplayName("given object to save"
        + " when save object using MongoDB template"
        + " then object is saved")
    @Test
    void test() throws Exception {
        // given
        DBObject objectToSave = BasicDBObjectBuilder.start()
            .add("key", "value")
            .get();

        // when
        mongoTemplate.save(objectToSave, "collection");

        // then
        assertThat(mongoTemplate.findAll(DBObject.class, "collection")).extracting("key")
            .containsOnly("value");
    }
}
4.日志
添加如下内容到src/test/resources/application.propertes以启用日志消息

logging.level.org.springframework.boot.autoconfigure.mongo.embedded=on
logging.level.org.mongodb=on
```

##### 17、@WebMVCTest

主要用于controller层测试，只覆盖应用程序的controller层， HTTP请求和响应是Mock出来的，因此不会创建真正的连接。因此需要用@MockBean注解创建所需的Bean进行模拟接口调用。
如果Controller层对Service层中的其他bean有依赖关系，那么需要使用Mock提供所需的依赖项。
WebMvcTest要快得多，因为我们只加载了应用程序的一小部分。

##### 18、@AutoConfigureMockMVC

类似于@WebMVCTest，只不过启动的是整个SpringBoot上下文

##### 19、@MockBean

创建和注入一个Mockito Mock

##### 20、@JsonTest

限制SpringBoot的自动化配置，以处理JSON

该注解会自动化配置出一个JacksonTester 或 GsonTester实例

##### 21、@TestPropertySource

类级别，指派测试类的属性源

#### 8、数据访问注解

##### 1、@Transactional

@Transactional 可以作用在接口、类、类方法。

- **作用于类**：当把@Transactional 注解放在类上时，表示所有该类的public方法都配置相同的事务属性信息。

- **作用于方法**：当类配置了@Transactional，方法也配置了@Transactional，方法的事务会覆盖类的事务配置信息。

- **作用于接口**：不推荐这种使用方法，因为一旦标注在Interface上并且配置了Spring AOP 使用CGLib动态代理，将会导致@Transactional注解失效

  ```java
  @Transactional
  @RestController
  @RequestMapping
  public class MybatisPlusController {
      @Autowired
      private CityInfoDictMapper cityInfoDictMapper;
      
      @Transactional(rollbackFor = Exception.class)
      @GetMapping("/test")
      public String test() throws Exception {
          CityInfoDict cityInfoDict = new CityInfoDict();
          cityInfoDict.setParentCityId(2);
          cityInfoDict.setCityName("2");
          cityInfoDict.setCityLevel("2");
          cityInfoDict.setCityCode("2");
          int insert = cityInfoDictMapper.insert(cityInfoDict);
          return insert + "";
      }
  }
  ```

##### 2、@Transactional 注解的属性

```java
propagation属性
    
propagation 代表事务的传播行为，默认值为 Propagation.REQUIRED，其他的属性信息如下：
Propagation.REQUIRED：如果当前存在事务，则加入该事务，如果当前不存在事务，则创建一个新的事务。( 也就是说如果A方法和B方法都添加了注解，在默认传播模式下，A方法内部调用B方法，会把两个方法的事务合并为一个事务 ）
Propagation.SUPPORTS：如果当前存在事务，则加入该事务；如果当前不存在事务，则以非事务的方式继续运行。
Propagation.MANDATORY：如果当前存在事务，则加入该事务；如果当前不存在事务，则抛出异常。
Propagation.REQUIRES_NEW：重新创建一个新的事务，如果当前存在事务，暂停当前的事务。( 当类A中的 a 方法用默认Propagation.REQUIRED模式，类B中的 b方法加上采用 Propagation.REQUIRES_NEW模式，然后在 a 方法中调用 b方法操作数据库，然而 a方法抛出异常后，b方法并没有进行回滚，因为Propagation.REQUIRES_NEW会暂停 a方法的事务 )
Propagation.NOT_SUPPORTED：以非事务的方式运行，如果当前存在事务，暂停当前的事务。
Propagation.NEVER：以非事务的方式运行，如果当前存在事务，则抛出异常。
Propagation.NESTED ：和 Propagation.REQUIRED 效果一样。
                                                          
isolation 属性
isolation ：事务的隔离级别，默认值为 Isolation.DEFAULT。
Isolation.DEFAULT：使用底层数据库默认的隔离级别。
Isolation.READ_UNCOMMITTED
Isolation.READ_COMMITTED
Isolation.REPEATABLE_READ
Isolation.SERIALIZABLE
                                                          
timeout 属性
timeout ：事务的超时时间，默认值为 -1。如果超过该时间限制但事务还没有完成，则自动回滚事务。

readOnly 属性
readOnly ：指定事务是否为只读事务，默认值为 false；为了忽略那些不需要事务的方法，比如读取数据，可以设置 read-only 为 true。

rollbackFor 属性
rollbackFor ：用于指定能够触发事务回滚的异常类型，可以指定多个异常类型。

noRollbackFor属性**
noRollbackFor：抛出指定的异常类型，不回滚事务，也可以指定多个异常类型。

```

##### 3、@Transactional 注解的失效原因

```java
1、@Transactional 应用在非 public 修饰的方法上
	如果Transactional注解应用在非public 修饰的方法上，Transactional将会失效.
    之所以会失效是因为在Spring AOP 代理时，如上图所示 TransactionInterceptor （事务拦截器）在目标方法执行前后进行拦截，DynamicAdvisedInterceptor（CglibAopProxy 的内部类）的 intercept 方法或 JdkDynamicAopProxy 的 invoke 方法会间接调用 AbstractFallbackTransactionAttributeSource的 computeTransactionAttribute 方法，获取Transactional 注解的事务配置信息。
    protected TransactionAttribute computeTransactionAttribute(Method method,
    Class<?> targetClass) {
        // Don't allow no-public methods as required.
            if (allowPublicMethodsOnly() && 		       !Modifier.isPublic(method.getModifiers())) {
            return null;
    }
    此方法会检查目标方法的修饰符是否为 public，不是 public则不会获取@Transactional 的属性配置信息。
注意：protected、private 修饰的方法上使用 @Transactional 注解，虽然事务无效，但不会有任何报错，这是我们很容犯错的一点。
        
2、@Transactional 注解属性 propagation 设置错误
这种失效是由于配置错误，若是错误的配置以下三种 propagation，事务将不会发生回滚。

TransactionDefinition.PROPAGATION_SUPPORTS：如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务的方式继续运行。 TransactionDefinition.PROPAGATION_NOT_SUPPORTED：以非事务方式运行，如果当前存在事务，则把当前事务挂起。 TransactionDefinition.PROPAGATION_NEVER：以非事务方式运行，如果当前存在事务，则抛出异常。

3、@Transactional 注解属性 rollbackFor 设置错误
rollbackFor 可以指定能够触发事务回滚的异常类型。Spring默认抛出了未检查unchecked异常（继承自 RuntimeException 的异常）或者 Error才回滚事务；其他异常不会触发回滚事务。如果在事务中抛出其他类型的异常，但却期望 Spring 能够回滚事务，就需要指定 rollbackFor属性。
        
 // 希望自定义的异常可以进行回滚
@Transactional(propagation= Propagation.REQUIRED,rollbackFor= MyException.class
若在目标方法中抛出的异常是 rollbackFor 指定的异常的子类，事务同样会回滚。Spring源码如下：

private int getDepth(Class<?> exceptionClass, int depth) {
        if (exceptionClass.getName().contains(this.exceptionName)) {
            // Found it!
            return depth;
}
        // If we've gone as far as we can go and haven't found it...
        if (exceptionClass == Throwable.class) {
            return -1;
}
return getDepth(exceptionClass.getSuperclass(), depth + 1);
}
4、同一个类中方法调用，导致@Transactional失效
开发中避免不了会对同一个类里面的方法调用，比如有一个类Test，它的一个方法A，A再调用本类的方法B（不论方法B是用public还是private修饰），但方法A没有声明注解事务，而B方法有。则外部调用方法A之后，方法B的事务是不会起作用的。这也是经常犯错误的一个地方。

那为啥会出现这种情况？其实这还是由于使用Spring AOP代理造成的，因为只有当事务方法被当前类以外的代码调用时，才会由Spring生成的代理对象来管理。

//@Transactional
    @GetMapping("/test")
    private Integer A() throws Exception {
        CityInfoDict cityInfoDict = new CityInfoDict();
        cityInfoDict.setCityName("2");
        /**
         * B 插入字段为 3的数据
         */
        this.insertB();
        /**
         * A 插入字段为 2的数据
         */
        int insert = cityInfoDictMapper.insert(cityInfoDict);

        return insert;
    }

    @Transactional()
    public Integer insertB() throws Exception {
        CityInfoDict cityInfoDict = new CityInfoDict();
        cityInfoDict.setCityName("3");
        cityInfoDict.setParentCityId(3);

        return cityInfoDictMapper.insert(cityInfoDict);
    }
5、异常被你的 catch“吃了”导致@Transactional失效
这种情况是最常见的一种@Transactional注解失效场景，

    @Transactional
    private Integer A() throws Exception {
        int insert = 0;
        try {
            CityInfoDict cityInfoDict = new CityInfoDict();
            cityInfoDict.setCityName("2");
            cityInfoDict.setParentCityId(2);
            /**
             * A 插入字段为 2的数据
             */
            insert = cityInfoDictMapper.insert(cityInfoDict);
            /**
             * B 插入字段为 3的数据
             */
            b.insertB();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
如果B方法内部抛了异常，而A方法此时try catch了B方法的异常，那这个事务还能正常回滚吗？

答案：不能！

会抛出异常：

org.springframework.transaction.UnexpectedRollbackException: Transaction rolled back because it has been marked as rollback-only
因为当ServiceB中抛出了一个异常以后，ServiceB标识当前事务需要rollback。但是ServiceA中由于你手动的捕获这个异常并进行处理，ServiceA认为当前事务应该正常commit。此时就出现了前后不一致，也就是因为这样，抛出了前面的UnexpectedRollbackException异常。

spring的事务是在调用业务方法之前开始的，业务方法执行完毕之后才执行commit or rollback，事务是否执行取决于是否抛出runtime异常。如果抛出runtime exception 并在你的业务方法中没有catch到的话，事务会回滚。

在业务方法中一般不需要catch异常，如果非要catch一定要抛出throw new RuntimeException()，或者注解中指定抛异常类型@Transactional(rollbackFor=Exception.class)，否则会导致事务失效，数据commit造成数据不一致，所以有些时候try catch反倒会画蛇添足。

6、数据库引擎不支持事务
这种情况出现的概率并不高，事务能否生效数据库引擎是否支持事务是关键。常用的MySQL数据库默认使用支持事务的innodb引擎。一旦数据库引擎切换成不支持事务的myisam，那事务就从根本上失效了。       
```



#### 9、JPA注解

##### 1、@Entity

表明这是一个实体类。一般和@Table配合使用。 如果表名和实体类名相同的话，@Table可以省略

```java
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "oms_user", schema = "test")
public class UserEntity {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Column(name = "ID", unique = true, nullable = false, length = 32)
    private Integer id;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email", length = 32)
    private String email;

    //TODO get和set方法略...

}
```

##### 2、@Table

映射数据库中的表

##### 3、@Column

映射表中的列

##### 4、@Id

表示该属性为主键

##### 5、@GeneratedValue

指定主键生成器的名字和生成策略

##### 6、@SequenceGeneretor

自动为实体的数字标识字段/属性分配值

##### 7、@MappedSuperClass

用在确定是父类的Entity上。父类的属性可被子类继承

##### 8、@NoRepositoryBean

在充当父类的Repository上注解，以告诉Spring不要实例化该Repository

##### 9、@Transient

表示该属性并非是一个到数据库表字段的映射,ORM框架应忽略它。 如果一个属性并非数据库表的字段映射,就务必将其标示为@Transient,否则,ORM框架默认其注解为@Basic。

##### 10、@Basic(fetch=FetchType.LAZY)

指定实体属性的加载方式

##### 11、@JsonIgnore

标记在属性上，指示当进行序列化或反序列化时，忽略该属性

##### 12、@JoinColumn

一对一：本表中指向另一个表的外键。 一对多：另一个表指向本表的外键

##### 13、@OneToOne

一对一

##### 14、@OneToMany

一对多

##### 15、@ManyToOne

多对一

#### 10、SpringMVC和 REST注解

##### 1、@Controller

用于定义控制器类，在spring 项目中由控制器负责将用户发来的URL请求转发到对应的服务接口（service层）， 一般这个注解在类中，通常方法需要配合注解@RequestMapping

```java
@Controller
@RequestMapping(“/demoInfo”)
publicclass DemoController {
    @Autowired
    private DemoInfoService demoInfoService;

    @RequestMapping("/hello")
    public String hello(Map<String,Object> map){
        System.out.println("DemoController.hello()");
        map.put("hello","from TemplateController.helloHtml");
        //会使用hello.html或者hello.ftl模板进行渲染显示.
        return"/hello";
    }
}
```

##### 2、@RestController

@Controller和@ResponseBody的合集,表示这是个控制器bean, 并且是将函数的返回值直接填入HTTP响应体中,是REST风格的控制器

```java
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(“/demoInfo2”)
publicclass DemoController2 {

    @RequestMapping("/test")
    public String test(){
        return"ok";
    }
}
```

2、@RestController

Spring4之后加入的注解，原来在@Controller中返回json需要@ResponseBody来配合，如果直接用@RestController替代@Controller就不需要再配置@ResponseBody，默认返回json格式。

![Spring中的18个注解，你会几个？](http://p9.pstatp.com/large/pgc-image/2065add8ec3d4cf784a357f47cd6e38f)

3、@RestController注解是@Controller和@ResponseBody的合集,表示这是个控制器 bean,并且是将函数的返回值直 接填入 HTTP 响应体中,是 REST 风格的控制器。

> 注：现在都是前后端分离，说实话我已经很久没有用过@Controller。如果你的项目太老了的话，就当我没说。

单独使用 @Controller 不加 @ResponseBody的话一般使用在要返回一个视图的情况，这种情况属于比较传统的 Spring MVC 的应用，对应于前后端不分离的情况。@Controller +@ResponseBody 返回 JSON 或 XML 形式数据

##### 3、@RequestMapping

RequestMapping是一个用来处理请求地址映射的注解，可用于类或方法上。 用于类上，表示类中的所有响应请求的方法都是以该地址作为父路径。
该注解有六个属性：
params:指定request中必须包含某些参数值是，才让该方法处理
headers:指定request中必须包含某些指定的header值，才能让该方法处理请求
value:指定请求的实际地址，指定的地址可以是URI Template 模式
method:指定请求的method类型， GET、POST、PUT、DELETE等
consumes:指定处理请求的提交内容类型（Content-Type），如application/json,text/html;
produces:指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回

```java
value的uri值为以下三类：
A)可以指定为普通的具体值；
B)可以指定为含有某变量的一类值(URI Template Patterns with Path Variables)；
C)可以指定为含正则表达式的一类值( URI Template Patterns with Regular Expressions);

@RequestMapping(value="/owners/{ownerId}", method=RequestMethod.GET)  
public String findOwner(@PathVariable String ownerId, Model model) {  
  Owner owner = ownerService.findOwner(ownerId);    
  model.addAttribute("owner", owner);    
  return "displayOwner";   
}  
@RequestMapping("/spring-web/{symbolicName:[a-z-]+}-{version:\d\.\d\.\d}.{extension:\.[a-z]}")  
  public void handle(@PathVariable String version, @PathVariable String extension) {      
    // ...  
  }  
}  
cousumes示例

@Controller  
@RequestMapping(value = "/pets", method = RequestMethod.POST, consumes="application/json")  
public void addPet(@RequestBody Pet pet, Model model) {      
    // implementation omitted  
}  
produces示例

@Controller  
@RequestMapping(value = "/pets/{petId}", method = RequestMethod.GET, produces="application/json")  
@ResponseBody  
public Pet getPet(@PathVariable String petId, Model model) {      
    // implementation omitted  
}  
params示例

  @RequestMapping(value = "/pets/{petId}", method = RequestMethod.GET, params="myParam=myValue")  
  public void findPet(@PathVariable String ownerId, @PathVariable String petId, Model model) {      
    // implementation omitted  
  }  
headers示例

@RequestMapping(value = "/pets", method = RequestMethod.GET, headers="Referer=http://www.jckj.com/")  
  public void findPet(@PathVariable String ownerId, @PathVariable String petId, Model model) {      
    // implementation omitted  
  }  
```

##### 4、@RequestMapping变体

​	@GetMapping

​			等于@RequestMapping(method = RequestMethod.GET)

​	@PostMapping

​			等于@RequestMapping(method = RequestMethod.POST)

​	@PutMapping

​			等于@RequestMapping(method = RequestMethod.PUT)

​	@PatchMapping

​			等于@RequestMapping(method = RequestMethod.PATCH)

​	@DeleteMapping

​			等于@RequestMapping(method = RequestMethod.DELETE)

##### 5、@CookieValue

用于方法参数上获得cookie

```java
假设有一个如下的cookieJSESSIONID=418AB76CD83EF94U85YD34W
要获取该cookie的值

@RequestMapping("/cookieValue")
public void getCookieValue(@CookieValue "JSESSIONID" String cookie){
}
```

##### 6、@CrossOrigin

用于类和方法上，以实现跨域请求。 有时，运行JavaScript的主机和服务数据的主机不是同一个，此时就涉及到跨域(CORS)

```java
@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/account")
public class AccountController {


//允许来自example.com的请求调用
@CrossOrigin(origins = "http://example.com")
@RequestMapping("/message")
  public Message getMessage() {
      // ...
    }

//允许所有的跨域请求
@RequestMapping("/note")
    public Note getNote() {
        // ...
    }
}
```

##### 7、@ExceptionHandler

用于方法上，指示异常处理类

##### 8、@InitBinder

初始化绑定器，用于数据绑定、设置数据转换器等

```java
	/**
     * 应用到所有@RequestMapping注解方法，在其执行之前初始化数据绑定器
     * @param binder
     */
    @InitBinder
    public void initBinder(WebDataBinder binder) {}
```

##### 9、@Mappings @Mapping

用于字段上。 Mapping是一个Meta注解，以指示web映射注解
Mappings可用于多个

##### 10、@MatrixVariable

矩阵变量

##### 11、@PathVariable

路径变量，获取路径上传过来的参数

##### 12、@RequestAttribute

绑定请求属性到handler方法参数

```java
先用@ModelAttribute定义预先存在的属性

    @ModelAttribute
    void beforeInvokingHandlerMethod(HttpServletRequest request) {
        request.setAttribute("foo", "hello world");
    }
	再用@RequestAttribute 去请求数据：

	@RequestMapping(value="/data/custom", method=RequestMethod.GET)
    public @ResponseBody String custom(@RequestAttribute("foo") String foo) {
        return "Got 'foo' request attribute value '" + foo + "'";
    }
在HTML页面中请求数据：

<div id="customArgs">
            <h3>Custom Resolvable Web Arguments</h3>    
            <ul>
                <li>
                    <a id="customArg" class="textLink" href="<c:url value="/data/custom" />">Custom</a>
                </li>
            </ul>
</div>
用ajax请求数据：

$("a.textLink").click(function() {
        var link = $(this);
        $.ajax({
            url: link.attr("href"),
            dataType: "text",
            success: function (text) {
                alert(text)
            }
        })
    })
```

##### 13、@RequestBody

指示方法参数应该绑定到Http请求Body HttpMessageConveter负责将HTTP请求消息转为对象

```java
有如下请求

$.ajax({
　　　　　　　　url:"/login",
　　　　　　　　type:"POST",
　　　　　　　　data:'{"userName":"admin","pwd","admin123"}',
　　　　　　　　content-type:"application/json charset=utf-8",
　　　　　　　　success:function(data){
　　　　　　　　　　alert("request success ! ");
　　　　　　　　}
　　　　});
控制器中处理时

　　　　@requestMapping("/login")
　　　　public void login(@requestBody String userName,@requestBody String pwd){
　　　　　　System.out.println(userName+" ："+pwd);
　　　　}
这种情况是将JSON字符串中的两个变量的值分别赋予了两个字符串，但是呢假如我有一个User类，拥有如下字段：
　　String userName; 　　String pwd;
　　　　那么上述参数可以改为以下形式：

　　　　@requestMapping("/login")
　　　　public void login(@requestBody User user){
　　　　　　System.out.println(user.getUserName()+" ："+user.getPwd());
　　　　}
@requestBody User user这种形式会将JSON字符串中的值赋予user对象相应的属性上
需要注意的是，JSON字符串中的key必须对应user中的属性名，否则是请求不过去的。
```

##### 14、@RequestHeader

映射控制器参数到请求头的值

```java
这是一个Request 的header部分：

Host                    localhost:8080
Accept                  text/html,application/xhtml+xml,application/xml;q=0.9
Accept-Language         fr,en-gb;q=0.7,en;q=0.3
Accept-Encoding         gzip,deflate
Accept-Charset          ISO-8859-1,utf-8;q=0.7,*;q=0.7
Keep-Alive              300
@RequestMapping("/displayHeaderInfo.do")
public void displayHeaderInfo(@RequestHeader("Accept-Encoding") String encoding,
                              @RequestHeader("Keep-Alive") long keepAlive)  {

  //...

}
```

##### 15、@RequestParam

用在方法的参数前面

```java
 @RequestMapping(method = RequestMethod.GET)
    public String setupForm(@RequestParam("petId") int petId, ModelMap model) {
        Pet pet = this.clinic.loadPet(petId);
        model.addAttribute("pet", pet);
        return "petForm";
    }
```

用于将请求参数区数据映射到功能处理方法的参数上

例如

![Spring中的18个注解，你会几个？](http://p1.pstatp.com/large/pgc-image/a2ab76a28fac4fc388a5151b37c98a52)

这个id就是要接收从接口传递过来的参数id的值的，如果接口传递过来的参数名和你接收的不一致，也可以如下

![Spring中的18个注解，你会几个？](http://p1.pstatp.com/large/pgc-image/c0dd3e9e975f4b4b94a6a5cc053d933b)

其中course_id就是接口传递的参数，id就是映射course_id的参数名

##### 16、@RequestPart

替代@RequestParam以获得多部的内容并绑定到方法参数

```java
	/**
     * 单文件上传
     * @param file
     * @param bucket
     * @return
     */
    @RequestMapping("uploadFile")
    public JsonResult uploadFile(@RequestPart("file") MultipartFile file, @RequestParam String bucket){

        String fileUrl = aliossService.uploadFile(file, bucket);
        Map<String,String> result = new HashMap<>();
        result.put("fileUrl",fileUrl);

        return success(result);
    }
```

##### 17、@ResponseBody

指示方法返回值应该直接写入Response Body（不再走视图处理器） Spring使用HttpMessageConverter实现了返回对象转为响应体，返回json 字符串。

```java
   @RequestMapping("/login")
　　@ResponseBody
　　public User login(User user){
　　　　return user;
　　}
User字段：userName pwd
那么在前台接收到的数据为：{"userName":"xxx","pwd":"xxx"}
```

##### 18、@ResponseStatus

用于方法和异常类上。以一个状态码作为指示，且原因必须返回。

也可注解于Controller，其所有的@RequestMapping方法都会继承它

```java
定义一个异常类：

@ResponseStatus(value = HttpStatus.FORBIDDEN,reason = "用户名和密码不匹配!")
public class UserNameNotMatchPasswordException extends RuntimeException{  
}
抛出一个异常:

@RequestMapping("/testResponseStatusExceptionResolver")
public String testResponseStatusExceptionResolver(@RequestParam("i") int i){
    if (i==13){
        throw new UserNameNotMatchPasswordException();
    }
    System.out.println("testResponseStatusExceptionResolver....");
    return "success";
}
```

##### 19、@SessionAttribute

用于方法参数。绑定方法参数到会话属性

##### 20、@SessionAttributes

用于将会话属性用Bean封装

```java
@ModelAttribute("person")
public Person getPerson(){} 
// within the same controller as above snippet
@Controller
@SeesionAttributes(value="person", types={Person.class})
public class PersonController{}
```

##### 21、@JsonBackReference

解决嵌套外链问题

##### 22、@RepositoryRestResourcepublic

配合spring-boot-starter-data-rest使用

##### 23、@PathVariable

路径变量

```java
RequestMapping(“user/get/mac/{macAddress}”)
public String getByMacAddress(@PathVariable String macAddress){
    //do something;
}
```

##### 24、@ModelAttribute

把值绑定到Model中，使全局@RequestMapping可以获取到该值

```java
	/**
     * 把值绑定到Model中，使全局@RequestMapping可以获取到该值
     * @param model
     */
    @ModelAttribute
    public void addAttributes(Model model) {
        model.addAttribute("author", "Magical Sam");
    }
```

@ModelAttribute

使用地方有三种：

**1、标记在方法上。**

> 标记在方法上，会在每一个@RequestMapping标注的方法前执行，如果有返回值，则自动将该返回值加入到ModelMap中。

**(1) 在有返回的方法上:**

当ModelAttribute设置了value，方法返回的值会以这个value为key，以参数接受到的值作为value，存入到Model中，如下面的方法执行之后，最终相当于 model.addAttribute("user_name", name);假如 @ModelAttribute没有自定义value，则相当于

model.addAttribute("name", name);

![Spring中的18个注解，你会几个？](http://p1.pstatp.com/large/pgc-image/95fe5b7e68904e33acc690606fa7fb4b)

**(2) 在没返回的方法上：**

需要手动model.add方法

![Spring中的18个注解，你会几个？](http://p1.pstatp.com/large/pgc-image/32f7c1a43b584edaae385ed446d66ae7)

我们在当前类下建一个请求方法：

![Spring中的18个注解，你会几个？](http://p1.pstatp.com/large/pgc-image/dca1cd4abea74439b64ae4bdae17da65)

在浏览器中输入访问地址并且加上参数：

http://localhost:8081/api/test/mod?name=我是小菜&age=12

最终输出如下：

![Spring中的18个注解，你会几个？](http://p1.pstatp.com/large/pgc-image/5a88635b433e436b84611ace8f0c63b3)

**2、标记在方法的参数上。**

> 标记在方法的参数上，会将客户端传递过来的参数按名称注入到指定对象中，并且会将这个对象自动加入ModelMap中，便于View层使用.
> 我们在上面的类中加入一个方法如下

![Spring中的18个注解，你会几个？](http://p1.pstatp.com/large/pgc-image/a143cc5a92094833a95a657decc25619)

在浏览器中输入访问地址并且加上参数：

http://localhost:8081/api/test/mod2?name=我是小菜&age=12

最终输出：

![Spring中的18个注解，你会几个？](http://p9.pstatp.com/large/pgc-image/e1f8d10d9d66481686dc3c2ad82dd215)

从结果就能看出，用在方法参数中的@ModelAttribute注解，实际上是一种接受参数并且自动放入Model对象中，便于使用。

##### 25、@Valid

验证器，一般配合@InitBinder使用

```java
Person验证器类

import com.zkn.learnspringmvc.scope.PersonScope;
import org.springframework.util.StringUtils;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;


public class PersonalValidtor implements Validator{

    /**
     * 判断支持的JavaBean类型
     * @param aClass
     * @return
     */
    @Override
    public boolean supports(Class<?> aClass) {
        return PersonScope.class.equals(aClass);
    }

    /**
     * 实现Validator中的validate接口
     * @param obj
     * @param errors
     */
    @Override
    public void validate(Object obj, Errors errors) {
        //把校验信息注册到Error的实现类里
        ValidationUtils.rejectIfEmpty(errors,"name",null,"姓名不能为空!");
        PersonScope personScope = (PersonScope) obj;
        if(StringUtils.isEmpty(personScope.getAddress())){
            errors.rejectValue("address",null,"家庭地址不能为空!!!!");
        }
    }
}
绑定该验证器到WebDataBinder

	@InitBinder
    public void initBinder(WebDataBinder webDataBinder){
        webDataBinder.addValidators(new PersonalValidtor());
    }
使用@Valid

    @RequestMapping(value = "testPersonalValidtor.do")
    @ResponseBody
    //直接返回对象
    public Object testPersonalValidtor(@Valid PersonScope personScope, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            StringBuffer sb = new StringBuffer();
            for(ObjectError objectError : bindingResult.getAllErrors()){
                sb.append(((FieldError)objectError).getField() +" : ").append(objectError.getDefaultMessage());
            }
            return sb.toString();
        }else{
            return personScope;
        }
    }
```

##### 26、@Scope

用来配置 spring bean 的作用域，它标识 bean 的作用域。

默认值是单例

> 1、singleton:单例模式,全局有且仅有一个实例
> 2、prototype:原型模式,每次获取Bean的时候会有一个新的实例
> 3、request:request表示该针对每一次HTTP请求都会产生一个新的bean，同时该bean仅在当前HTTP request内有效
> 4、session:session作用域表示该针对每一次HTTP请求都会产生一个新的bean，同时该bean仅在当前HTTP session内有效
> 5、global session:只在portal应用中有用，给每一个 global http session 新建一个Bean实例。

##### 27、@SessionAttributes

默认情况下Spring MVC将模型中的数据存储到request域中。当一个请求结束后，数据就失效了。如果要跨页面使用。那么需要使用到session。而@SessionAttributes注解就可以使得模型中的数据存储一份到session域中

参数：

1、names：这是一个字符串数组。里面应写需要存储到session中数据的名称。

2、types：根据指定参数的类型，将模型中对应类型的参数存储到session中

3、value：和names是一样的。

![Spring中的18个注解，你会几个？](http://p1.pstatp.com/large/pgc-image/8776e5c9538046978811db6e5a3e3921)

##### 28. ResponseEntity 

```java
controller 中返回数据总结： ResponseEntity，@ResponseBody、@ResponseStstus

在传统的开发过程中，我们的控制CONTROLLER层通常需要转向一个JSP视图；但随着WEB2.0相关技术的崛起，我们很多时候只需要返回数据即可，而不是一个JSP页面。

- ResponseEntity：表示整个HTTP响应：状态代码，标题和正文。因此，我们可以使用它来完全配置HTTP响应，它是一个对象。
- @ResponseBody：返回json格式的结果
- @ResponseStatus：返回状态
```

##### 29、@param

```java
实例一 @Param注解单一属性

dao层示例

Public User selectUser(@param(“userName”) String name,@param(“userpassword”) String password);

xml映射对应示例

<select id=" selectUser" resultMap="BaseResultMap">  
   select  *  from user_user_t   where user_name = #{userName，jdbcType=VARCHAR} and user_password=#{userPassword,jdbcType=VARCHAR}  
</select>
 
注意：采用#{}的方式把@Param注解括号内的参数进行引用（括号内参数对应的是形参如 userName对应的是name）；

实例二 @Param注解JavaBean对象

dao层示例

public List<user> getUserInformation(@Param("user") User user);

xml映射对应示例

<select id="getUserInformation" parameterType="com.github.demo.vo.User" resultMap="userMapper">  
        select   
        <include refid="User_Base_Column_List" />  
        from mo_user t where 1=1  
                      <!-- 因为传进来的是对象所以这样写是取不到值得 -->  
            <if test="user.userName!=null  and user.userName!=''">   and   t.user_name = #{user.userName}  </if>  
            <if test="user.userAge!=null  and user.userAge!=''">   and   t.user_age = #{user.userAge}  </if>  
    </select>  
 
-----mybatis

1，使用@Param注解

当以下面的方式进行写SQL语句时：

    @Select("select column from table where userid = #{userid} ")
    public int selectColumn(int userid);

当你使用了使用@Param注解来声明参数时，如果使用 #{} 或 ${} 的方式都可以。

    @Select("select column from table where userid = ${userid} ")
    public int selectColumn(@Param("userid") int userid);

 

当你不使用@Param注解来声明参数时，必须使用使用 #{}方式。如果使用 ${} 的方式，会报错。

    @Select("select column from table where userid = ${userid} ")
    public int selectColumn(@Param("userid") int userid);

 

2，不使用@Param注解

不使用@Param注解时，参数只能有一个，并且是Javabean。在SQL语句里可以引用JavaBean的属性，而且只能引用JavaBean的属性。

    // 这里id是user的属性

    @Select("SELECT * from Table where id = ${id}")
    Enchashment selectUserById(User user);
```

```java
1.关于@Param
@Param是MyBatis所提供的(org.apache.ibatis.annotations.Param)，作为Dao层的注解，作用是用于传递参数，从而可以与SQL中的的字段名相对应，一般在2=<参数数<=5时使用最佳。

2.原始的方法
当只有一个参数时，没什么好说的，传进去一个值也只有一个参数可以匹配。当存在多个参数时，传进去的值就区分不开了，这时可以考虑用Map，例如接口

public List<Role> findRoleByMap(Map<String, Object> parameter);
xml文件 ---------------（1）

<select id="findRoleByMap" parameterType="map" resultType="role">
    SELECT id,name FROM t_role
    WHERE roleName=#{roleName}
    AND note=#{note}
<select>
测试文件

RoleMapper roleMapper = sqlSession.getMapper(RoleMapper.class);
Map<String, Object> parameter = new HashMap<>();
parameter.put("roleName", "剑士");
parameter.put("note", "决战紫禁之巅");
List<Role> roles = roleMapper.findRolesByMap(parameter);
3.使用@Param
很明显上面的缺点就在于可读性差，每次必须阅读他的键，才能明白其中的作用，并且不能限定其传递的数据类型，下面是使用@Param的情况，需要将接口改为

public List<Role> findRoleByAnnotation(@Param("roleName") String roleName, @Param("note") String note);
这样我们就可以直接传入对应的值了。

当然也可以使用Java Bean来传递多个参数，定义一个POJO

public class RoleParam {
    private String roleName;
    private String note;
    /*getter和setter*/
}
此时接口就变为

public List<Role> findRoleByBean(RoleParam role);
这样对应的xml文件与1处的区别就在于id和parameterType发生了变化，id对应的方法和parameterType对应该类的权限定名。

而使用更多的场景可能是这样的，对应多个POJO

public List<Role> findRoleByMix(@Param("roleP") RoleParam role, @Param("permissionP") PermissionParam permission);
这样就可以进行如下映射

<select id="findRoleByMix" resultType="role">
    SELECT id,name FROM t_role
    WHERE roleName=#{roleP.roleName}
    AND note=#{rolep.note}
    AND level=#{permissionP.level}
<select>
注意此时并不需要写出parameterType属性，Mybatis会进行自动搜索。

4.后记
最后也许会有小火办会问，那@Param和@RequestParam是什么关系呢？其实它们没有关系，就跟Java和JavaScript，雷锋和雷锋塔一样，拥有相似的外表，其实作用是不一样的，@Param是地处Dao层，是为了传递多个参数，解决的是可读性和直观性；而@RequestParam是位列Controller层，作用是为获取前端参数，解决的是前后端参数不一致的问题。所以它们没有关系！
```



## ResponseEntity

ResponseEntity是一种泛型类型。因此，我们可以使用任何类型作为响应主体：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
@Controller
public class XXXController{

 @GetMapping("/hello")
 public ResponseEntity<String> hello() {
   return new ResponseEntity<>("Hello World!", HttpStatus.OK);
}			   
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

这里字符串"Hello World!"作为字符串返回给REST端。

我们可以设置HTTP标头：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
@GetMapping("/customHeader")
ResponseEntity<String> customHeader() {
   HttpHeaders headers = new HttpHeaders();
   headers.add("Custom-Header", "foo");

   return new ResponseEntity<>(
         "Custom header set", headers, HttpStatus.OK);
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

设置自定义标头：

```
@GetMapping("/customHeader")
ResponseEntity<String> customHeader() {
   return ResponseEntity.ok()
         .header("Custom-Header", "foo")
         .body("Custom header set")
```

如果将一个对象放入：

```
@GetMapping("/hello")
 public ResponseEntity<String> hello() {
   return new ResponseEntity<>(new User(‘jdon’), HttpStatus.OK);
 }
```

返回的是JSON字符串：

[ { ‘name’: 'jdon'}]

下面是返回对象的JSON列表：

```
public ResponseEntity<List<ProcessDef>> repositoryProcessDefinitionsGet() {
   return new ResponseEntity<>(processDefRepo.findAll(), HttpStatus.FOUND);
}
```

以上是通过ResponseEntity这个对象在代码中灵活操控响应，但是在一般情况下我们只是想返回一个带有数据的正常响应，那么只要使用@注解即可

##  

## @ResponseBody

在类级别使用@Controller标注情况下， @ResponseBody注解告诉返回的对象将自动序列化为JSON，并通过回控制器的HttpResponse对象。

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
@Controller
public class XXXController{

  @ResponseBody
  public User postResponseController(@RequestBody LoginForm loginForm) {
      return new User("Thanks For Posting!!!");
  }
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

将返回客户端JSON字符串：

[ { ‘name’: Thanks For Posting!!!"}]

在@RestController注解了类的情况下，我们就不需要再使用@ResponseBody了。

 

## @ResponseStatus

ResponseStatus虽然只是规定了返回的状态，但是只需要标注在方法上，简单，而且状态码与返回类型分离，比较清晰。我们将上面返回对象列表的代码使用ResponseStatus改写如下，注意类级别@RestController:

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
@RestController
public class XXXController{

 @ResponseStatus(HttpStatus.FOUND)
 public User postResponseController() {
    return new User("Thanks For Posting!!!");
 }
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

这也会返回客户端JSON字符串：

[ { ‘name’: Thanks For Posting!!!"}]

这样的代码更加专注于业务。

 

## 直接操控响应

Spring还允许我们直接访问javax.servlet.http.HttpServletResponse对象; 我们只需要将它声明为方法参数：

```
@GetMapping("/manual")
public void manual(HttpServletResponse response) throws IOException {
      response.setHeader("Custom-Header", "foo");
      response.setStatus(200);
      response.getWriter().println("Hello World!");
      }
```

由于Spring在底层实现之上提供了抽象和附加功能，因此如果以这种方式直接操纵响应，会失去很多Spring提供方便功能。





#### 11、全局异常处理

##### 1、@ControllerAdvice

​		包含@Component。可以被扫描到。 统一处理异常，一般与@ExceptionHandler一起使用

```java
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pptv.frame.dto.common.ResponseDTO;
import com.pptv.frame.dto.common.ServiceCodeEnum;

@ControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler({
                        ArrayIndexOutOfBoundsException.class
    })
    @ResponseBody
    public ResponseDTO handleArrayIndexOutOfBoundsException(ArrayIndexOutOfBoundsException e) {
        // TODO 记录log日志
        e.printStackTrace();
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.wrapResponse(ServiceCodeEnum.E999998, "数组越界异常");

        return responseDTO;
    }

    @ExceptionHandler({
                        Exception.class
    })
    @ResponseBody
    public ResponseDTO handleException(Exception e) {
        // TODO 记录log日志
        e.printStackTrace();
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.wrapResponse(ServiceCodeEnum.E999998, "未知异常");
        return responseDTO;
    }

}
```

##### 2、@RestControllerAdvice

​		@ControllerAdvice 和 @ResponseBody的组合

##### 3、全局处理 Controller 层异常

1. @ControllerAdvice :注解定义全局异常处理类
2. @ExceptionHandler :注解声明异常处理方法

如何使用呢？拿我们在第 5 节参数校验这块来举例子。如果方法参数不对的话就会抛出MethodArgumentNotValidException，我们来处理这个异常。

> @ControllerAdvice
> @ResponseBody
> public class GlobalExceptionHandler {
> /**
> \* 请求参数异常处理
> */
> @ExceptionHandler(MethodArgumentNotValidException.class)
> public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex, HttpServletRequest request) {
> ......
> }
> }

#### 12、处理常见的 HTTP 请求类型

##### **1、5 种常见的请求类型:**

- **GET** ：请求从服务器获取特定资源。举个例子：GET /users（获取所有学生）
- **POST** ：在服务器上创建一个新的资源。举个例子：POST /users（创建学生）
- **PUT** ：更新服务器上的资源（客户端提供更新后的整个资源）。举个例子：PUT /users/12（更新编号为 12 的学生）
- **DELETE** ：从服务器删除特定的资源。举个例子：DELETE /users/12（删除编号为 12 的学生）
- **PATCH** ：更新服务器上的资源（客户端提供更改的属性，可以看做作是部分更新），使用的比较少，这里就不举例子了。

##### 2. GET 请求

@GetMapping("users") 等价于@RequestMapping(value="/users",method=RequestMethod.GET)

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p3.pstatp.com/large/pgc-image/09ec0404e5f74b9ca5a4ce352106dae0)

##### 3、POST 请求

@PostMapping("users") 等价于@RequestMapping(value="/users",method=RequestMethod.POST)

关于@RequestBody注解的使用，在下面的“前后端传值”这块会讲到。

```
@PostMapping("/users")public ResponseEntity<User> createUser(@Valid @RequestBody UserCreateRequest userCreateRequest) { return userRespository.save(user);}
```

##### 4、PUT 请求

@PutMapping("/users/{userId}") 等价于@RequestMapping(value="/users/{userId}",method=RequestMethod.PUT)

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p1.pstatp.com/large/pgc-image/cc31300de3d74cdbabdad301d38097a8)

##### 5、DELETE 请求

@DeleteMapping("/users/{userId}")等价于@RequestMapping(value="/users/{userId}",method=RequestMethod.DELETE)

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p1.pstatp.com/large/pgc-image/c567663eb2ff4e2b9e164bd31e82feaf)

##### 6、PATCH 请求

一般实际项目中，我们都是 PUT 不够用了之后才用 PATCH 请求去更新数据。

```java
 @PatchMapping("/profile")  
public ResponseEntity updateStudent(@RequestBody StudentUpdateRequest studentUpdateRequest) {        studentRepository.updateDetail(studentUpdateRequest);        return ResponseEntity.ok().build();    }
```

#### 13. 前后端传值

**掌握前后端传值的正确姿势，是你开始 CRUD 的第一步！**

##### 1、@PathVariable 和 @RequestParam

@PathVariable用于获取路径参数，@RequestParam用于获取查询参数。

举个简单的例子：

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p3.pstatp.com/large/pgc-image/aa1f9c621ae04f268806c122eaca2847)



如果我们请求的 url 是：/klasses/{123456}/teachers?type=web

那么我们服务获取到的数据就是：klassId=123456,type=web。

##### 2、@RequestBody

用于读取 Request 请求（可能是 POST,PUT,DELETE,GET 请求）的 body 部分并且**Content-Type 为 application/json** 格式的数据，接收到数据之后会自动将数据绑定到 Java 对象上去。系统会使用HttpMessageConverter或者自定义的HttpMessageConverter将请求的 body 中的 json 字符串转换为 java 对象。

我用一个简单的例子来给演示一下基本使用！

我们有一个注册的接口：

```java
@PostMapping("/sign-up")
public ResponseEntity signUp(@RequestBody @Valid UserRegisterRequest userRegisterRequest){  userService.save(userRegisterRequest);  return ResponseEntity.ok().build();}
```

UserRegisterRequest对象：

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p3.pstatp.com/large/pgc-image/d02ac18f09bc47f39bdfc639dc55777d)



我们发送 post 请求到这个接口，并且 body 携带 JSON 数据：

```
{"userName":"coder","fullName":"shuangkou","password":"123456"}
```

这样我们的后端就可以直接把 json 格式的数据映射到我们的UserRegisterRequest 类上。

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p3.pstatp.com/large/pgc-image/3b5a48d304bd4412a373454d6984eafc)



需要注意的是：**一个请求方法只可以有一个@RequestBody，但是可以有多个@RequestParam和@PathVariable**。 如果你的方法必须要用两个@RequestBody来接受数据的话，大概率是你的数据库设计或者系统设计出问题了！

##### 14、读取配置信息

**很多时候我们需要将一些常用的配置信息比如阿里云 oss、发送短信、微信认证的相关配置信息等等放到配置文件中。**

**下面我们来看一下 Spring 为我们提供了哪些方式帮助我们从配置文件中读取这些配置信息。**

我们的数据源application.yml内容如下：

```
wuhan2020: 2020年初武汉爆发了新型冠状病毒，疫情严重，但是，我相信一切都会过去！武汉加油！中国加油！my-profile:  name: Guide哥  email: koushuangbwcx@163.comlibrary:  location: 湖北武汉加油中国加油  books:    - name: 天才基本法      description: 二十二岁的林朝夕在父亲确诊阿尔茨海默病这天，得知自己暗恋多年的校园男神裴之即将出国深造的消息——对方考取的学校，恰是父亲当年为她放弃的那所。    - name: 时间的秩序      description: 为什么我们记得过去，而非未来？时间“流逝”意味着什么？是我们存在于时间之内，还是时间存在于我们之中？卡洛·罗韦利用诗意的文字，邀请我们思考这一亘古难题——时间的本质。    - name: 了不起的我      description: 如何养成一个新习惯？如何让心智变得更成熟？如何拥有高质量的关系？ 如何走出人生的艰难时刻？
```

**5.1. @value(常用)**

使用 @Value("${property}") 读取比较简单的配置信息：

```
@Value("${wuhan2020}")String wuhan2020;
```

**5.2. @ConfigurationProperties(常用)**

通过@ConfigurationProperties读取配置信息并与 bean 绑定。

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p1.pstatp.com/large/pgc-image/b422846195b44ecc8bf3714714c7edde)



你可以像使用普通的 Spring bean 一样，将其注入到类中使用。

**5.3. PropertySource（不常用）**

@PropertySource读取指定 properties 文件

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p3.pstatp.com/large/pgc-image/67f029d5341140278ad76c78d6838d75)

#### 14、参数校验

**数据的校验的重要性就不用说了，即使在前端对数据进行校验的情况下，我们还是要对传入后端的数据再进行一遍校验，避免用户绕过浏览器直接通过一些 HTTP 工具直接向后端请求一些违法数据。**

**JSR(Java Specification Requests）** 是一套 JavaBean 参数校验的标准，它定义了很多常用的校验注解，我们可以直接将这些注解加在我们 JavaBean 的属性上面，这样就可以在需要校验的时候进行校验了，非常方便！

校验的时候我们实际用的是 **Hibernate Validator** 框架。Hibernate Validator 是 Hibernate 团队最初的数据校验框架，Hibernate Validator 4.x 是 Bean Validation 1.0（JSR 303）的参考实现，Hibernate Validator 5.x 是 Bean Validation 1.1（JSR 349）的参考实现，目前最新版的 Hibernate Validator 6.x 是 Bean Validation 2.0（JSR 380）的参考实现。

SpringBoot 项目的 spring-boot-starter-web 依赖中已经有 hibernate-validator 包，不需要引用相关依赖。如下图所示（通过 idea 插件—Maven Helper 生成）：

> 需要注意的是： 所有的注解，推荐使用 JSR 注解，即javax.validation.constraints，而不是org.hibernate.validator.constraints

**6.1. 一些常用的字段验证的注解**

- @NotEmpty 被注释的字符串的不能为 null 也不能为空
- @NotBlank 被注释的字符串非 null，并且必须包含一个非空白字符
- @Null 被注释的元素必须为 null
- @NotNull 被注释的元素必须不为 null
- @AssertTrue 被注释的元素必须为 true
- @AssertFalse 被注释的元素必须为 false
- @Pattern(regex=,flag=)被注释的元素必须符合指定的正则表达式
- @Email 被注释的元素必须是 Email 格式。
- @Min(value)被注释的元素必须是一个数字，其值必须大于等于指定的最小值
- @Max(value)被注释的元素必须是一个数字，其值必须小于等于指定的最大值
- @DecimalMin(value)被注释的元素必须是一个数字，其值必须大于等于指定的最小值
- @DecimalMax(value) 被注释的元素必须是一个数字，其值必须小于等于指定的最大值
- @Size(max=, min=)被注释的元素的大小必须在指定的范围内
- @Digits (integer, fraction)被注释的元素必须是一个数字，其值必须在可接受的范围内
- @Past被注释的元素必须是一个过去的日期
- @Future 被注释的元素必须是一个将来的日期
- ......

**6.2. 验证请求体(RequestBody)**

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p1.pstatp.com/large/pgc-image/3e855edce0b444f298b3912d139e28ee)



我们在需要验证的参数上加上了@Valid注解，如果验证失败，它将抛出MethodArgumentNotValidException。

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p1.pstatp.com/large/pgc-image/a7b57a4bc949449f8293bcac3d2de89c)



**6.3. 验证请求参数(Path Variables 和 Request Parameters)**

**一定一定不要忘记在类上加上 Validated 注解了，这个参数可以告诉 Spring 去校验方法参数。**

> @RestController
> @RequestMapping("/api")
> @Validated
> public class PersonController {
> @GetMapping("/person/{id}")
> public ResponseEntity<Integer> getPersonByID(@Valid @PathVariable("id") @Max(value = 5,message = "超过 id 的范围了") Integer id) {
> return ResponseEntity.ok().body(id);
> }
> }

#### 15、JPA 相关

**8.1. 创建表**

@Entity声明一个类对应一个数据库实体。

@Table 设置表明

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p1.pstatp.com/large/pgc-image/53e1fdce2d024769aa6076a02284ac08)



**8.2. 创建主键**

@Id ：声明一个字段为主键。

使用@Id声明之后，我们还需要定义主键的生成策略。我们可以使用 @GeneratedValue 指定主键生成策略。

**1.通过 @GeneratedValue直接使用 JPA 内置提供的四种主键生成策略来指定主键生成策略。**

```
@Id@GeneratedValue(strategy = GenerationType.IDENTITY)private Long id;
```

JPA 使用枚举定义了 4 中常见的主键生成策略，如下：

> 注：枚举替代常量的一种用法

```
public enum GenerationType {    /**     * 使用一个特定的数据库表格来保存主键     * 持久化引擎通过关系数据库的一张特定的表格来生成主键,     */    TABLE,    /**     *在某些数据库中,不支持主键自增长,比如Oracle、PostgreSQL其提供了一种叫做"序列(sequence)"的机制生成主键     */    SEQUENCE,    /**     * 主键自增长     */    IDENTITY,    /**     *把主键生成策略交给持久化引擎(persistence engine),     *持久化引擎会根据数据库在以上三种主键生成 策略中选择其中一种     */    AUTO}
```

@GeneratedValue注解默认使用的策略是GenerationType.AUTO

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p1.pstatp.com/large/pgc-image/b6fdc13789d14b64825f3594363b4401)



一般使用 MySQL 数据库的话，使用GenerationType.IDENTITY策略比较普遍一点（分布式系统的话需要另外考虑使用分布式 ID）。

**2.通过 @GenericGenerator声明一个主键策略，然后 @GeneratedValue使用这个策略**

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p3.pstatp.com/large/pgc-image/85cc988459b34da8a31696bc501128da)



**等价于：**

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p1.pstatp.com/large/pgc-image/cf88f1b76d544bec9adabc2b36225786)



jpa 提供的主键生成策略有如下几种：

> public class DefaultIdentifierGeneratorFactory
> implements MutableIdentifierGeneratorFactory, Serializable, ServiceRegistryAwareService {
> @SuppressWarnings("deprecation")
> public DefaultIdentifierGeneratorFactory() {
> register( "uuid2", UUIDGenerator.class );
> register( "guid", GUIDGenerator.class ); // can be done with UUIDGenerator + strategy
> register( "uuid", UUIDHexGenerator.class ); // "deprecated" for new use
> register( "uuid.hex", UUIDHexGenerator.class ); // uuid.hex is deprecated
> register( "assigned", Assigned.class );
> register( "identity", IdentityGenerator.class );
> register( "select", SelectGenerator.class );
> register( "sequence", SequenceStyleGenerator.class );
> register( "seqhilo", SequenceHiLoGenerator.class );
> register( "increment", IncrementGenerator.class );
> register( "foreign", ForeignGenerator.class );
> register( "sequence-identity", SequenceIdentityGenerator.class );
> register( "enhanced-sequence", SequenceStyleGenerator.class );
> register( "enhanced-table", TableGenerator.class );
> }
> public void register(String strategy, Class generatorClass) {
> LOG.debugf( "Registering IdentifierGenerator strategy [%s] -> [%s]", strategy, generatorClass.getName() );
> final Class previous = generatorStrategyToClassNameMap.put( strategy, generatorClass );
> if ( previous != null ) {
> LOG.debugf( " - overriding [%s]", previous.getName() );
> }
> }
> }

**8.3. 设置字段类型**

@Column 声明字段。

**示例：**

设置属性 userName 对应的数据库字段名为 user_name，长度为 32，非空

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p1.pstatp.com/large/pgc-image/a1c040bf353d477e962aab9e43022645)

设置字段类型并且加默认值，这个还是挺常用的。

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p1.pstatp.com/large/pgc-image/5b6711313344482eba91e406f4d4f5a9)

**8.4. 指定不持久化特定字段**

@Transient ：声明不需要与数据库映射的字段，在保存的时候不需要保存进数据库 。

如果我们想让secrect 这个字段不被持久化，可以使用 @Transient关键字声明。

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p1.pstatp.com/large/pgc-image/268280d0b8c2443c8f7e2cad5b66e408)

除了 @Transient关键字声明， 还可以采用下面几种方法：

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p9.pstatp.com/large/pgc-image/2a0a3811c6864700a0d2c919b67cc6fe)

一般使用注解的方式比较多。

**8.5. 声明大字段**

@Lob:声明某个字段为大字段。

```
@Lobprivate String content;
```

更详细的声明：

```
@Lob//指定 Lob 类型数据的获取策略， FetchType.EAGER 表示非延迟 加载，而 FetchType. LAZY 表示延迟加载 ；@Basic(fetch = FetchType.EAGER)//columnDefinition 属性指定数据表对应的 Lob 字段类型@Column(name = "content", columnDefinition = "LONGTEXT NOT NULL")private String content;
```

**8.6. 创建枚举类型的字段**

可以使用枚举类型的字段，不过枚举字段要用@Enumerated注解修饰。

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p1.pstatp.com/large/pgc-image/8692aff580b4419db79a99b73e0561fb)

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p1.pstatp.com/large/pgc-image/466d8cfa74d44cb2b7d52c0afbfe0d40)

数据库里面对应存储的是 MAIL/FEMAIL。

**8.7. 增加审计功能**

只要继承了 AbstractAuditBase的类都会默认加上下面四个字段。

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p1.pstatp.com/large/pgc-image/76d5f795d2c34e82bd295571b9073200)

我们对应的审计功能对应地配置类可能是下面这样的（Spring Security 项目）:

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p1.pstatp.com/large/pgc-image/9a778a673a824a478097cfa56dde4746)

简单介绍一下上面设计到的一些注解：

1. @CreatedDate: 表示该字段为创建时间时间字段，在这个实体被 insert 的时候，会设置值
2. @CreatedBy :表示该字段为创建人，在这个实体被 insert 的时候，会设置值@LastModifiedDate、@LastModifiedBy同理。

@EnableJpaAuditing：开启 JPA 审计功能。

**8.8. 删除/修改数据**

@Modifying 注解提示 JPA 该操作是修改操作,注意还要配合@Transactional注解使用。

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p9.pstatp.com/large/pgc-image/4fa6d3159e0d4fca91dc99444ab43a95)

**8.9. 关联关系**

- @OneToOne 声明一对一关系
- @OneToMany 声明一对多关系
- @ManyToOne声明多对一关系
- MangToMang声明多对多关系

#### 16、事务 @Transactional

在要开启事务的方法上使用@Transactional注解即可!

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p9.pstatp.com/large/pgc-image/835620df68d441a6832b565ce9952d4c)

我们知道 Exception 分为运行时异常 RuntimeException 和非运行时异常。在@Transactional注解中如果不配置rollbackFor属性,那么事物只会在遇到RuntimeException的时候才会回滚,加上rollbackFor=Exception.class,可以让事物在遇到非运行时异常时也回滚。

@Transactional 注解一般用在可以作用在类或者方法上。

- **作用于类**：当把@Transactional 注解放在类上时，表示所有该类的public 方法都配置相同的事务属性信息。
- **作用于方法**：当类配置了@Transactional，方法也配置了@Transactional，方法的事务会覆盖类的事务配置信息。

#### 17、 json 数据处理

**10.1. 过滤 json 数据**

**@JsonIgnoreProperties 作用在类上用于过滤掉特定字段不返回或者不解析。**

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p3.pstatp.com/large/pgc-image/7c76ee0d1fa148c7b1b2bd92048747f7)

**@JsonIgnore一般用于类的属性上，作用和上面的@JsonIgnoreProperties 一样。**

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p3.pstatp.com/large/pgc-image/ead9e9729357479582a4d80cc41e4396)

**10.2. 格式化 json 数据**

@JsonFormat一般用来格式化 json 数据。：

比如：

```
@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone="GMT")private Date date;
```

**10.3. 扁平化对象**

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p1.pstatp.com/large/pgc-image/26995e15d0274ee89e6d1163a29e4e3a)

未扁平化之前：

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p3.pstatp.com/large/pgc-image/3b3953709faa4854810ff9d04a40425d)

使用@JsonUnwrapped 扁平对象之后：

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p1.pstatp.com/large/pgc-image/1602462a4c9d4f699304b26cafbdacda)

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p1.pstatp.com/large/pgc-image/a7006056510f4d469bec8942dd02c1f0)



#### 18、测试相关

**@ActiveProfiles一般作用于测试类上， 用于声明生效的 Spring 配置文件。**

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p3.pstatp.com/large/pgc-image/f10b1a7ab59a4d79a752a0a0276fe685)



**@Test声明一个方法为测试方法**

**@Transactional被声明的测试方法的数据会回滚，避免污染测试数据。**

**@WithMockUser Spring Security 提供的，用来模拟一个真实用户，并且可以赋予权限。**

![接近8000字的Spring/SpringBoot常用注解总结！安排！](http://p3.pstatp.com/large/pgc-image/c0930fb89406423f874a9675080c420e)

#### 19、其他注解积累

##### 1、 @Deprecated

注解 @Deprecated 可以标记 Java API 状态，可以是以下几种：

- 使用它存在风险，可能导致错误
- 可能在未来版本中不兼容
- 可能在未来版本中删除
- 一个更好和更高效的方案已经取代它。

Java 9 中注解增加了两个新元素：**since** 和 **forRemoval**。

- **since**: 元素指定已注解的API元素已被弃用的版本。
- **forRemoval**: 元素表示注解的 API 元素在将来的版本中被删除，应该迁移 API。

#### 20、JDK新特性

```java
Java8 新增了非常多的特性，我们主要讨论以下几个：

Lambda 表达式 − Lambda 允许把函数作为一个方法的参数（函数作为参数传递到方法中）。

方法引用 − 方法引用提供了非常有用的语法，可以直接引用已有Java类或对象（实例）的方法或构造器。与lambda联合使用，方法引用可以使语言的构造更紧凑简洁，减少冗余代码。

默认方法 − 默认方法就是一个在接口里面有了一个实现的方法。

新工具 − 新的编译工具，如：Nashorn引擎 jjs、 类依赖分析器jdeps。

Stream API −新添加的Stream API（java.util.stream） 把真正的函数式编程风格引入到Java中。

Date Time API − 加强对日期与时间的处理。

Optional 类 − Optional 类已经成为 Java 8 类库的一部分，用来解决空指针异常。

Nashorn, JavaScript 引擎 − Java 8提供了一个新的Nashorn javascript引擎，它允许我们在JVM上运行特定的javascript应用。
```

```java
Java 9 新特性
模块系统：模块是一个包的容器，Java 9 最大的变化之一是引入了模块系统（Jigsaw 项目）。
    
REPL (JShell)：交互式编程环境。
    
HTTP 2 客户端：HTTP/2标准是HTTP协议的最新版本，新的 HTTPClient API 支持 WebSocket 和 HTTP2 流以及服务器推送特性。
    
改进的 Javadoc：Javadoc 现在支持在 API 文档中的进行搜索。另外，Javadoc 的输出现在符合兼容 HTML5 标准。
    
多版本兼容 JAR 包：多版本兼容 JAR 功能能让你创建仅在特定版本的 Java 环境中运行库程序时选择使用的 class 版本。
    
集合工厂方法：List，Set 和 Map 接口中，新的静态工厂方法可以创建这些集合的不可变实例。
    
私有接口方法：在接口中使用private私有方法。我们可以使用 private 访问修饰符在接口中编写私有方法。
    
进程 API: 改进的 API 来控制和管理操作系统进程。引进 java.lang.ProcessHandle 及其嵌套接口 Info 来让开发者逃离时常因为要获取一个本地进程的 PID 而不得不使用本地代码的窘境。
    
改进的 Stream API：改进的 Stream API 添加了一些便利的方法，使流处理更容易，并使用收集器编写复杂的查询。
    
改进 try-with-resources：如果你已经有一个资源是 final 或等效于 final 变量,您可以在 try-with-resources 语句中使用该变量，而无需在 try-with-resources 语句中声明一个新变量。
改进的弃用注解 @Deprecated：注解 @Deprecated 可以标记 Java API 状态，可以表示被标记的 API 将会被移除，或者已经破坏。
    
改进钻石操作符(Diamond Operator) ：匿名类可以使用钻石操作符(Diamond Operator)。
    
改进 Optional 类：java.util.Optional 添加了很多新的有用方法，Optional 可以直接转为 stream。
多分辨率图像 API：定义多分辨率图像API，开发者可以很容易的操作和展示不同分辨率的图像了。
    
改进的 CompletableFuture API ： CompletableFuture 类的异步机制可以在 ProcessHandle.onExit 方法退出时执行操作。
    
轻量级的 JSON API：内置了一个轻量级的JSON API
    
响应式流（Reactive Streams) API: Java 9中引入了新的响应式流 API 来支持 Java 9 中的响应式编程。
```

