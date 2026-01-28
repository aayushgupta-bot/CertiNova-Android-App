import { Question } from '../types/quiz';

export const dp700Questions: Question[] = [
  {
    id: 'dp700_1',
    question: 'You have a Fabric workspace. You have semi-structured data. You need to read the data by using T-SQL, KQL, and Apache Spark. The data will only be written by using Spark. What should you use to store the data?',
    type: 'mcq',
    options: [
      'A. a lakehouse',
      'B. an eventhouse',
      'C. a datamart',
      'D. a warehouse'
    ],
    correct_answer: 'A',
    explanation: 'A lakehouse in Microsoft Fabric supports reading data with T-SQL (via the SQL analytics endpoint), KQL (via shortcuts or direct access), and Apache Spark. Since the data will only be written using Spark and is semi-structured, a lakehouse is the ideal choice as it stores data in Delta Lake format which supports all these query engines. An eventhouse is for real-time analytics, a datamart is for self-service BI, and a warehouse uses T-SQL for both reading and writing.',
    category: 'Lakehouse',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_2',
    question: 'You have a Fabric workspace that contains a warehouse named Warehouse1. You have an on-premises Microsoft SQL Server database named Database1 that is accessed by using an on-premises data gateway. You need to copy data from Database1 to Warehouse1. Which item should you use?',
    type: 'mcq',
    options: [
      'A. a Dataflow Gen1 dataflow',
      'B. a data pipeline',
      'C. a KQL queryset',
      'D. a notebook'
    ],
    correct_answer: 'B',
    explanation: 'A data pipeline is the correct choice for copying data from an on-premises SQL Server database (via an on-premises data gateway) to a Fabric warehouse. Data pipelines support the Copy Data activity which can connect to on-premises sources through data gateways. Dataflow Gen1 has limited gateway support, KQL querysets are for querying KQL databases, and notebooks cannot directly use on-premises data gateways for SQL Server connections.',
    category: 'Data Pipeline',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_3',
    question: 'You have a Fabric F32 capacity that contains a workspace. The workspace contains a warehouse named DW1 that is modelled by using MD5 hash surrogate keys. DW1 contains a single fact table that has grown from 200 million rows to 500 million rows during the past year. You have Microsoft Power BI reports that are based on Direct Lake. The reports show year-over-year values. Users report that the performance of some of the reports has degraded over time and some visuals show errors. You need to resolve the performance issues. The solution must meet the following requirements: Provide the best query performance. Minimize operational costs. What should you do?',
    type: 'mcq',
    options: [
      'A. Change the MD5 hash to SHA256.',
      'B. Increase the capacity.',
      'C. Enable V-Order.',
      'D. Modify the surrogate keys to use a different data type.',
      'E. Create views.'
    ],
    correct_answer: 'D',
    explanation: 'The issue is that MD5 hash surrogate keys produce string/binary values which are inefficient for joins and lookups compared to integer keys. Direct Lake semantic models perform best with integer surrogate keys. Changing to integer surrogate keys (like BIGINT identity columns) will significantly improve query performance without increasing capacity costs. V-Order helps with compression but won\'t address the fundamental key inefficiency. Increasing capacity adds cost. SHA256 would make the problem worse with even longer keys.',
    category: 'Data Warehouse',
    difficulty: 'hard',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_4',
    question: 'You have a Fabric workspace that contains a lakehouse named Lakehouse1. Data is ingested into Lakehouse1 as one flat table. The table contains the following columns: TransactionID, Date, ProductID, ProductName, ProductColor, SalesAmount. You plan to load the data into a dimensional model and implement a star schema. From the original flat table, you create two tables named FactSales and DimProduct. You will track changes in DimProduct. You need to prepare the data. Which three columns should you include in the DimProduct table? Each correct answer presents part of the solution.',
    type: 'mcq',
    options: [
      'A. Date',
      'B. ProductName',
      'C. ProductColor',
      'D. TransactionID',
      'E. SalesAmount',
      'F. ProductID'
    ],
    correct_answer: 'BCF',
    explanation: 'In a star schema, the DimProduct dimension table should contain: ProductID (F) as the natural/business key to identify products, ProductName (B) as a descriptive attribute, and ProductColor (C) as another descriptive attribute. Date (A) belongs in a date dimension or the fact table, TransactionID (D) is the fact table\'s grain identifier, and SalesAmount (E) is a measure that belongs in the fact table. Additionally, for tracking changes (SCD), you would add surrogate key and validity columns.',
    category: 'Lakehouse',
    difficulty: 'hard',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_5',
    question: 'You have a Fabric workspace named Workspace1 that contains a notebook named Notebook1. In Workspace1, you create a new notebook named Notebook2. You need to ensure that you can attach Notebook2 to the same Apache Spark session as Notebook1. What should you do?',
    type: 'mcq',
    options: [
      'A. Enable high concurrency for notebooks.',
      'B. Enable dynamic allocation for the Spark pool.',
      'C. Change the runtime version.',
      'D. Increase the number of executors.'
    ],
    correct_answer: 'A',
    explanation: 'High concurrency mode in Fabric allows multiple notebooks to share the same Spark session. When enabled, you can attach multiple notebooks to a single Spark session, which improves resource utilization and reduces startup time. Dynamic allocation manages executor scaling but doesn\'t allow session sharing. Changing runtime version or increasing executors doesn\'t enable session sharing between notebooks.',
    category: 'Data Engineering',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_6',
    question: 'You have a Fabric workspace named Workspace1 that contains a lakehouse named Lakehouse1. Lakehouse1 contains the following tables: Orders, Customer, Employee. The Employee table contains Personally Identifiable Information (PII). A data engineer needs to write data to the Customer table but should NOT have access to view the Employee table. You need to ensure the data engineer can write data to the Customer table without reading data from the Employee table. Which three actions should you perform?',
    type: 'mcq',
    options: [
      'A. Share Lakehouse1 with the data engineer.',
      'B. Assign the data engineer the Contributor role for Workspace2.',
      'C. Assign the data engineer the Viewer role for Workspace2.',
      'D. Assign the data engineer the Contributor role for Workspace1.',
      'E. Migrate the Employee table from Lakehouse1 to Lakehouse2.',
      'F. Create a new workspace named Workspace2 that contains a new lakehouse named Lakehouse2.'
    ],
    correct_answer: 'BEF',
    explanation: 'To segregate access, you need to: (F) Create a new workspace Workspace2 with a new lakehouse Lakehouse2, (E) Migrate the Employee table to Lakehouse2 to isolate the PII data, and (B) Assign the data engineer the Contributor role for Workspace2 so they can write to tables. The Contributor role allows creating and modifying items. By moving the Employee table to a separate workspace that the engineer doesn\'t have access to, you maintain data isolation while allowing write access to Customer.',
    category: 'Security',
    difficulty: 'hard',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_7',
    question: 'You have a Fabric warehouse named DW1. DW1 contains a table that stores sales data and is used by multiple sales representatives. You plan to implement row-level security (RLS). You need to ensure that the sales representatives can see only their respective data. Which warehouse object do you require to implement RLS?',
    type: 'mcq',
    options: [
      'A. STORED PROCEDURE',
      'B. CONSTRAINT',
      'C. SCHEMA',
      'D. FUNCTION'
    ],
    correct_answer: 'D',
    explanation: 'To implement row-level security (RLS) in a Fabric warehouse, you need to create a security policy that uses an inline table-valued FUNCTION. The function acts as a predicate that filters rows based on the user context (such as comparing the user\'s email to a SalesRep column). You create the function first, then create a security policy that applies the function to the table. Stored procedures, constraints, and schemas are not used for RLS implementation.',
    category: 'Security',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_8',
    question: 'You have a Fabric deployment pipeline that uses three workspaces named Dev, Test, and Prod. You need to deploy an eventhouse as part of the deployment process. What should you use to add the eventhouse to the deployment process?',
    type: 'mcq',
    options: [
      'A. GitHub Actions',
      'B. a deployment pipeline',
      'C. an Azure DevOps pipeline'
    ],
    correct_answer: 'B',
    explanation: 'Fabric deployment pipelines natively support deploying eventhouses along with other Fabric items between workspaces (Dev, Test, Prod). Since you already have a Fabric deployment pipeline set up, you can simply add the eventhouse to it. Deployment pipelines in Fabric support most item types including eventhouses, lakehouses, warehouses, and more. While GitHub Actions and Azure DevOps can be used for CI/CD, the question specifically asks about adding to an existing Fabric deployment pipeline.',
    category: 'Deployment',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_9',
    question: 'You have a Fabric workspace named Workspace1 that contains a warehouse named Warehouse1. You plan to deploy Warehouse1 to a new workspace named Workspace2. As part of the deployment process, you need to verify whether Warehouse1 contains invalid references. The solution must minimize development effort. What should you use?',
    type: 'mcq',
    options: [
      'A. a database project',
      'B. a deployment pipeline',
      'C. a Python script',
      'D. a T-SQL script'
    ],
    correct_answer: 'B',
    explanation: 'A Fabric deployment pipeline automatically validates items before deployment, including checking for invalid references in warehouses. This requires minimal development effort as the validation is built into the deployment pipeline functionality. Using a database project, Python script, or T-SQL script would require significant custom development to check all references.',
    category: 'Deployment',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_10',
    question: 'You have a Fabric workspace that contains a Real-Time Intelligence solution and an eventhouse. Users report that from OneLake file explorer, they cannot see the data from the eventhouse. You enable OneLake availability for the eventhouse. What will be copied to OneLake?',
    type: 'mcq',
    options: [
      'A. only data added to new databases that are added to the eventhouse',
      'B. only the existing data in the eventhouse',
      'C. no data',
      'D. both new data and existing data in the eventhouse',
      'E. only new data added to the eventhouse'
    ],
    correct_answer: 'D',
    explanation: 'When you enable OneLake availability for an eventhouse, both existing data and new data are copied to OneLake. This provides a complete copy of all data in the eventhouse in Delta Parquet format, making it accessible through OneLake file explorer and other OneLake-compatible tools. The synchronization includes historical data, not just new data.',
    category: 'Real-Time Intelligence',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_11',
    question: 'You have a Fabric workspace named Workspace1. You plan to integrate Workspace1 with Azure DevOps. You will use a Fabric deployment pipeline named deployPipeline1 to deploy items from Workspace1 to higher environment workspaces as part of a medallion architecture. You will run deployPipeline1 by using an API call from an Azure DevOps pipeline. You need to configure API authentication between Azure DevOps and Fabric. Which type of authentication should you use?',
    type: 'mcq',
    options: [
      'A. service principal',
      'B. Microsoft Entra username and password',
      'C. managed private endpoint',
      'D. workspace identity'
    ],
    correct_answer: 'A',
    explanation: 'When calling Fabric APIs from Azure DevOps pipelines, you should use a service principal for authentication. Service principals provide secure, automated authentication without requiring interactive user login. They can be granted specific permissions and their credentials can be stored securely in Azure DevOps. Username/password authentication is not suitable for automated pipelines, managed private endpoints are for network connectivity, and workspace identity is for Fabric items accessing other resources.',
    category: 'Deployment',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_12',
    question: 'You have a Google Cloud Storage (GCS) container named storage1 that contains Delta Parquet files. You have a Fabric workspace named Workspace1 that has the cache for shortcuts enabled. Workspace1 contains a lakehouse named Lakehouse1 with shortcuts to files in GCS and Azure Data Lake Storage Gen2. Which shortcuts will retrieve data from the cache?',
    type: 'mcq',
    options: [
      'A. Only shortcuts to Azure Data Lake Storage Gen2',
      'B. Only shortcuts to Google Cloud Storage',
      'C. Both Azure Data Lake Storage Gen2 and Google Cloud Storage shortcuts',
      'D. Neither - caching is not supported for shortcuts'
    ],
    correct_answer: 'A',
    explanation: 'OneLake shortcut caching is supported for Azure Data Lake Storage Gen2 (ADLS Gen2) and Amazon S3 shortcuts, but NOT for Google Cloud Storage (GCS) shortcuts. When cache is enabled, data from supported cloud providers is cached in OneLake for faster access. GCS shortcuts always read directly from the source without caching.',
    category: 'Lakehouse',
    difficulty: 'hard',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_13',
    question: 'You have a Fabric workspace named Workspace1 that contains an Apache Spark job definition named Job1. You have an Azure SQL database named Source1 that has public internet access disabled. You need to ensure that Job1 can access the data in Source1. What should you create?',
    type: 'mcq',
    options: [
      'A. an on-premises data gateway',
      'B. a managed private endpoint',
      'C. an integration runtime',
      'D. a data management gateway'
    ],
    correct_answer: 'B',
    explanation: 'A managed private endpoint in Fabric allows secure connectivity to Azure services (like Azure SQL Database) that have public access disabled. The managed private endpoint creates a private link connection from Fabric to the Azure resource, enabling access over the Microsoft backbone network without going through the public internet. On-premises data gateways are for on-premises resources, not Azure PaaS services with disabled public access.',
    category: 'Data Engineering',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_14',
    question: 'Your company has a sales department that uses two Fabric workspaces named Workspace1 and Workspace2. The company decides to implement a domain strategy to organize the workspaces. You need to ensure that a user can perform the following tasks: Create a new domain for the sales department. Create two subdomains: one for the east region and one for the west region. Assign Workspace1 to the east region subdomain. Assign Workspace2 to the west region subdomain. The solution must follow the principle of least privilege. Which role should you assign to the user?',
    type: 'mcq',
    options: [
      'A. workspace Admin',
      'B. domain admin',
      'C. domain contributor',
      'D. Fabric admin'
    ],
    correct_answer: 'D',
    explanation: 'Creating new domains requires Fabric admin privileges. Only Fabric admins can create top-level domains and subdomains. Domain admins can manage existing domains but cannot create new ones. Workspace admins only have permissions within their workspace. Domain contributors can assign workspaces to domains but cannot create domains. Since the requirement includes creating a new domain and subdomains, the Fabric admin role is required.',
    category: 'Governance',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_15',
    question: 'You have a Fabric workspace named Workspace1 that contains a warehouse named DW1 and a data pipeline named Pipeline1. You plan to add a user named User3 to Workspace1. You need to ensure that User3 can perform the following actions: View all the items in Workspace1. Update the tables in DW1. The solution must follow the principle of least privilege. You already assigned the appropriate object-level permissions to DW1. Which workspace role should you assign to User3?',
    type: 'mcq',
    options: [
      'A. Admin',
      'B. Member',
      'C. Viewer',
      'D. Contributor'
    ],
    correct_answer: 'C',
    explanation: 'Following the principle of least privilege, since object-level permissions for DW1 have already been assigned, User3 only needs the Viewer role at the workspace level to view items. The Viewer role allows viewing all items in the workspace, while the specific write permissions to DW1 tables come from the already-assigned object-level permissions. Contributor or Member roles would grant more permissions than necessary.',
    category: 'Security',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_16',
    question: 'You have a Fabric capacity that contains a workspace named Workspace1. Workspace1 contains a lakehouse named Lakehouse1, a data pipeline, a notebook, and several Microsoft Power BI reports. A user named User1 wants to use SQL to analyze the data in Lakehouse1. You need to configure access for User1. The solution must meet the following requirements: Provide User1 with read access to the table data in Lakehouse1. Prevent User1 from using Apache Spark to query the underlying files in Lakehouse1. Prevent User1 from accessing other items in Workspace1. What should you do?',
    type: 'mcq',
    options: [
      'A. Share Lakehouse1 with User1 directly and select Read all SQL endpoint data.',
      'B. Assign User1 the Viewer role for Workspace1. Share Lakehouse1 with User1 and select Read all SQL endpoint data.',
      'C. Share Lakehouse1 with User1 directly and select Build reports on the default semantic model.',
      'D. Assign User1 the Member role for Workspace1. Share Lakehouse1 with User1 and select Read all SQL endpoint data.'
    ],
    correct_answer: 'A',
    explanation: 'Sharing Lakehouse1 directly with User1 and selecting "Read all SQL endpoint data" meets all requirements: it provides SQL read access to table data, does not grant Spark/file access (which requires "Read all Apache Spark" permission), and since you\'re sharing directly without assigning a workspace role, User1 won\'t have access to other items in the workspace. Assigning any workspace role would give access to other items.',
    category: 'Security',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_17',
    question: 'You have two Fabric workspaces named Workspace1 and Workspace2. You have a Fabric deployment pipeline named deployPipeline1 that deploys items from Workspace1 to Workspace2. DeployPipeline1 contains all the items in Workspace1. You recently modified the items in Workspace1. The workspaces currently contain paired items with the same names. You need to ensure that the items in Workspace1 overwrite the corresponding items in Workspace2. The solution must minimize effort. What should you do?',
    type: 'mcq',
    options: [
      'A. Delete all the items in Workspace2, and then run deployPipeline1.',
      'B. Rename each item in Workspace2 to have the same name as the items in Workspace1.',
      'C. Back up the items in Workspace2, and then run deployPipeline1.',
      'D. Run deployPipeline1 without modifying the items in Workspace2.'
    ],
    correct_answer: 'D',
    explanation: 'Fabric deployment pipelines automatically handle the overwriting of paired items. When items in the source workspace (Workspace1) are paired with items in the target workspace (Workspace2) by name, running the deployment pipeline will automatically overwrite the target items with the updated source items. No manual deletion, renaming, or backup is required - simply running the pipeline is sufficient and requires minimal effort.',
    category: 'Deployment',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_18',
    question: 'You have a Fabric workspace named Workspace1 that contains a data pipeline named Pipeline1 and a lakehouse named Lakehouse1. You have a deployment pipeline named deployPipeline1 that deploys Workspace1 to Workspace2. You restructure Workspace1 by adding a folder named Folder1 and moving Pipeline1 to Folder1. You use deployPipeline1 to deploy Workspace1 to Workspace2. What occurs to Workspace2?',
    type: 'mcq',
    options: [
      'A. Folder1 is created, Pipeline1 moves to Folder1, and Lakehouse1 is deployed.',
      'B. Only Pipeline1 and Lakehouse1 are deployed.',
      'C. Folder1 is created, and Pipeline1 and Lakehouse1 move to Folder1.',
      'D. Only Folder1 is created and Pipeline1 moves to Folder1.'
    ],
    correct_answer: 'A',
    explanation: 'Fabric deployment pipelines respect the folder structure of the source workspace. When you deploy from Workspace1 to Workspace2, the deployment pipeline will: create Folder1 in Workspace2, place Pipeline1 inside Folder1 (maintaining the folder structure), and deploy Lakehouse1 (at the root level since it wasn\'t moved to a folder). The folder structure is preserved during deployment.',
    category: 'Deployment',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_19',
    question: 'You have a Fabric workspace that contains a lakehouse and a notebook named Notebook1. Notebook1 reads data into a DataFrame from a table named Table1 and applies transformation logic. The data from the DataFrame is then written to a new Delta table named Table2 by using a merge operation. You need to consolidate the underlying Parquet files in Table1. Which command should you run?',
    type: 'mcq',
    options: [
      'A. VACUUM',
      'B. BROADCAST',
      'C. OPTIMIZE',
      'D. CACHE'
    ],
    correct_answer: 'C',
    explanation: 'The OPTIMIZE command in Delta Lake consolidates small Parquet files into larger files, improving read performance. This is known as file compaction or bin-packing. VACUUM removes old files that are no longer referenced by the Delta log but doesn\'t consolidate active files. BROADCAST is a Spark hint for joins, and CACHE is for caching data in memory.',
    category: 'Lakehouse',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_20',
    question: 'You have five Fabric workspaces. You are monitoring the execution of items by using Monitoring hub. You need to identify in which workspace a specific item runs. Which column should you view in Monitoring hub?',
    type: 'mcq',
    options: [
      'A. Start time',
      'B. Location',
      'C. Activity name',
      'D. Submitter',
      'E. Item type',
      'F. Status'
    ],
    correct_answer: 'B',
    explanation: 'In the Monitoring hub, the Location column shows the workspace where the item is located and runs. This allows you to identify which workspace a specific item execution belongs to when monitoring across multiple workspaces. Start time shows when execution began, Activity name shows the specific activity, Submitter shows who triggered it, and Item type shows what kind of item it is.',
    category: 'Monitoring',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_21',
    question: 'You have a Fabric workspace that contains a warehouse named DW1. DW1 is loaded by using a notebook named Notebook1. You need to identify which version of Delta was used when Notebook1 was executed. What should you use?',
    type: 'mcq',
    options: [
      'A. Real-Time hub',
      'B. OneLake data hub',
      'C. the Admin monitoring workspace',
      'D. Apache Spark History Server',
      'E. the Microsoft Fabric Capacity Metrics app'
    ],
    correct_answer: 'D',
    explanation: 'The Apache Spark History Server in Fabric provides detailed information about Spark job executions, including the environment configuration which contains the Delta Lake version used. You can access the Spark History Server from the notebook\'s run history to see details about the Spark environment and libraries used during execution.',
    category: 'Monitoring',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_22',
    question: 'You have a Fabric workspace that contains a semantic model named Model1. You need to dynamically execute and monitor the refresh progress of Model1. What should you use?',
    type: 'mcq',
    options: [
      'A. dynamic management views in Microsoft SQL Server Management Studio (SSMS)',
      'B. Monitoring hub',
      'C. dynamic management views in Azure Data Studio',
      'D. a semantic link in a notebook'
    ],
    correct_answer: 'D',
    explanation: 'Semantic link in a Fabric notebook allows you to programmatically interact with semantic models, including triggering refreshes and monitoring their progress. You can use the sempy library to execute refreshes and poll for status. DMVs are for querying warehouse/database metadata, and Monitoring hub shows historical runs but doesn\'t provide dynamic programmatic control.',
    category: 'Monitoring',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_23',
    question: 'You have a Fabric eventstream that loads data into a table named Bike_Location in a KQL database. The table contains the following columns: BikepointID, Street, Neighbourhood, No_Bikes, No_Empty_Docks, Timestamp. You need to apply transformation and filter logic to prepare the data for consumption. The solution must return data for a neighbourhood named "Sands End" when No_Bikes is at least 15. The results must be ordered by No_Bikes in ascending order. Which KQL query should you use?',
    type: 'mcq',
    options: [
      'A. Bike_Location | where Neighbourhood == "Sands End" and No_Bikes >= 15 | order by No_Bikes asc',
      'B. Bike_Location | filter Neighbourhood == "Sands End" | where No_Bikes > 15 | sort by No_Bikes',
      'C. Bike_Location | where Neighbourhood = "Sands End" and No_Bikes >= 15 | order by No_Bikes desc',
      'D. Bike_Location | where Neighbourhood == "Sands End" or No_Bikes >= 15 | order by No_Bikes asc'
    ],
    correct_answer: 'A',
    explanation: 'The correct KQL syntax uses: "where" for filtering (not "filter"), "==" for equality comparison, "and" for combining conditions, ">=" for "at least 15", and "order by ... asc" for ascending sort. Option A correctly implements all these requirements. Option B uses incorrect syntax, C uses "=" instead of "==" and wrong sort order, D uses "or" instead of "and".',
    category: 'Real-Time Intelligence',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_24',
    question: 'You have an Azure key vault named KeyVault1 that contains secrets. You have a Fabric workspace named Workspace1. Workspace1 contains a notebook named Notebook1 that loads data to a lakehouse and triggers the refresh of a semantic model. You need to retrieve the registered application ID and secret from KeyVault1 to generate the authentication token. Which method should you use?',
    type: 'mcq',
    options: [
      'A. notebookutils.credentials.getSecret with key vault URL and secret name',
      'B. notebookutils.credentials.putSecret with key vault URL and secret name',
      'C. notebookutils.credentials.getToken with key vault URL',
      'D. mssparkutils.credentials.getSecret with key vault URI and linked service name'
    ],
    correct_answer: 'A',
    explanation: 'In Fabric notebooks, you use notebookutils.credentials.getSecret() and provide the Azure Key Vault URL along with the secret name to retrieve secrets. This method securely retrieves the secret value without exposing it in code. putSecret is for writing secrets, getToken is for getting access tokens, and mssparkutils is the older Synapse syntax that requires a linked service.',
    category: 'Security',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_25',
    question: 'You have a Fabric workspace named Workspace1 that contains the following items: A Microsoft Power BI report named Report1, A Power BI dashboard named Dashboard1, A semantic model named Model1, A lakehouse named Lakehouse1. Your company requires that specific governance processes be implemented for the items. Which items can you endorse in Fabric?',
    type: 'mcq',
    options: [
      'A. Lakehouse1, Model1, and Dashboard1 only',
      'B. Lakehouse1, Model1, Report1, and Dashboard1',
      'C. Report1 and Dashboard1 only',
      'D. Model1, Report1, and Dashboard1 only',
      'E. Lakehouse1, Model1, and Report1 only'
    ],
    correct_answer: 'B',
    explanation: 'In Microsoft Fabric, you can endorse (promote or certify) most item types including lakehouses, semantic models, reports, and dashboards. Endorsement is a governance feature that helps users discover trusted, high-quality content. All four items listed (Lakehouse1, Model1, Report1, and Dashboard1) can be endorsed.',
    category: 'Governance',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_26',
    question: 'You have a Fabric workspace named Workspace1. Your company acquires GitHub licenses. You need to configure source control for Workspace1 to use GitHub. The solution must follow the principle of least privilege. Which permissions do you require to ensure that you can commit code to GitHub?',
    type: 'mcq',
    options: [
      'A. Actions (Read and write) and Contents (Read and write)',
      'B. Actions (Read and write) only',
      'C. Contents (Read and write) only',
      'D. Contents (Read) and Commit statuses (Read and write)'
    ],
    correct_answer: 'C',
    explanation: 'To commit code to a GitHub repository, you only need Contents (Read and write) permission. This permission allows you to read repository contents and push commits. Actions permission is for GitHub Actions workflows, and Commit statuses is for CI/CD status checks. Following least privilege, Contents (Read and write) is the minimum required permission for committing code.',
    category: 'Deployment',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_27',
    question: 'You have a Fabric workspace named Workspace1. You plan to configure Git integration for Workspace1 by using an Azure DevOps Git repository. An Azure DevOps admin creates the required artifacts to support the integration of Workspace1. Which details do you require to perform the integration?',
    type: 'mcq',
    options: [
      'A. the organization, project, Git repository, and branch',
      'B. the personal access token (PAT) for Git authentication and the Git repository URL',
      'C. the project, Git repository, branch, and Git folder',
      'D. the Git repository URL and the Git folder'
    ],
    correct_answer: 'A',
    explanation: 'To configure Git integration in Fabric with Azure DevOps, you need to specify: the Azure DevOps organization name, the project name, the Git repository name, and the branch to sync with. Authentication is handled through Microsoft Entra ID (not PAT), and the Git folder path is optional (defaults to root). The organization, project, repository, and branch are the required configuration parameters.',
    category: 'Deployment',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_28',
    question: 'You have a Fabric workspace that contains a lakehouse and a semantic model named Model1. You use a notebook named Notebook1 to ingest and transform data from an external data source. You need to execute Notebook1 as part of a data pipeline named Pipeline1. The process must meet the following requirements: Run daily at 07:00 AM UTC. Attempt to retry Notebook1 twice if the notebook fails. After Notebook1 executes successfully, refresh Model1. Which three actions should you perform?',
    type: 'mcq',
    options: [
      'A. Place the Semantic model refresh activity after the Notebook activity and link with On Success.',
      'B. From the Schedule settings of Pipeline1, configure a daily schedule at 07:00 UTC.',
      'C. Set the Retry setting of the Notebook activity to 2.',
      'D. From the Schedule settings of Notebook1, set the time zone to UTC.',
      'E. Set the Retry setting of the Semantic model refresh activity to 2.',
      'F. Place the Semantic model refresh activity after the Notebook activity and link with On Completion.'
    ],
    correct_answer: 'ABC',
    explanation: 'The correct actions are: (A) Link the Semantic model refresh activity after Notebook with "On Success" to ensure Model1 only refreshes when Notebook1 succeeds, (B) Configure Pipeline1\'s schedule for daily at 07:00 UTC, and (C) Set Notebook activity retry to 2 for two retry attempts on failure. The schedule should be on Pipeline1, not Notebook1. "On Success" is correct because Model1 should only refresh after successful notebook execution.',
    category: 'Data Pipeline',
    difficulty: 'hard',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_29',
    question: 'You have a Fabric workspace that contains a lakehouse named Lakehouse1. You plan to create a data pipeline named Pipeline1 to ingest data into Lakehouse1. You will use a parameter named param1 to pass an external value into Pipeline1. The param1 parameter has a data type of int. You need to ensure that the pipeline expression returns param1 as an int value. How should you specify the parameter value?',
    type: 'mcq',
    options: [
      'A. @pipeline().parameters.param1',
      'B. @{pipeline().parameters.param1}',
      'C. @string(pipeline().parameters.param1)',
      'D. @@pipeline().parameters.param1'
    ],
    correct_answer: 'A',
    explanation: 'The expression @pipeline().parameters.param1 correctly references the parameter and returns it as its original data type (int). The @ symbol at the beginning indicates a dynamic expression. Using @{} would convert to string interpolation, @string() explicitly converts to string, and @@ is used to escape the @ symbol (resulting in literal text, not an expression).',
    category: 'Data Pipeline',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_30',
    question: 'You have a Fabric workspace named Workspace1 that contains a lakehouse named Lakehouse1. Workspace1 contains the following items: A Dataflow Gen2 dataflow that copies data from an on-premises Microsoft SQL Server database to Lakehouse1, A notebook that transforms files and loads the data to Lakehouse1, A data pipeline that loads a CSV file to Lakehouse1. You need to develop an orchestration solution in Fabric that will load each item one after the other. The solution must be scheduled to run every 15 minutes. Which type of item should you use?',
    type: 'mcq',
    options: [
      'A. notebook',
      'B. warehouse',
      'C. Dataflow Gen2 dataflow',
      'D. data pipeline'
    ],
    correct_answer: 'D',
    explanation: 'A data pipeline is the correct choice for orchestrating multiple Fabric items (dataflows, notebooks, other pipelines) in sequence. Pipelines can include activities for running dataflows, notebooks, and other pipelines, and can be scheduled to run at regular intervals like every 15 minutes. Notebooks can call other notebooks but aren\'t designed for orchestrating dataflows. Warehouses and Dataflow Gen2 aren\'t orchestration tools.',
    category: 'Data Pipeline',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_31',
    question: 'You are building a Fabric notebook named MasterNotebook1 in a workspace. MasterNotebook1 will execute Notebook_01, Notebook_02, and Notebook_03 using mssparkutils.notebook.runMultiple with a DAG definition. You need to ensure that the notebooks are executed in the following sequence: 1. Notebook_03, 2. Notebook_01, 3. Notebook_02. Which two actions should you perform?',
    type: 'mcq',
    options: [
      'A. Move the declaration of Notebook_02 to the bottom of the DAG definition.',
      'B. Add dependencies to the execution of Notebook_03.',
      'C. Split the DAG definition into three separate definitions.',
      'D. Add dependencies to the execution of Notebook_02.',
      'E. Change the concurrency to 3.',
      'F. Move the declaration of Notebook_03 to the top of the DAG definition.'
    ],
    correct_answer: 'DF',
    explanation: 'In a DAG (Directed Acyclic Graph) for notebook execution: (F) The order of declaration determines initial execution order, so Notebook_03 should be declared first to run first. (D) You need to add dependencies to Notebook_02 so it depends on Notebook_01, ensuring the sequence 03→01→02. Adding dependencies creates the execution order relationship. Notebook_03 runs first (no dependencies), then Notebook_01 (depends on 03), then Notebook_02 (depends on 01).',
    category: 'Data Engineering',
    difficulty: 'hard',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_32',
    question: 'You have a Fabric workspace that contains a data pipeline named Pipeline1 as shown in the exhibit. Pipeline1 has a Copy activity that is set to run on failure and a stored procedure activity that runs on success. What will occur the next time Pipeline1 runs if the initial activity succeeds?',
    type: 'mcq',
    options: [
      'A. Copy activity will run first, and then the stored procedure will run.',
      'B. The stored procedure will run first, and then the Copy activity will run.',
      'C. The stored procedure will run and the Copy activity will be skipped.',
      'D. The Copy activity will run and the stored procedure will be skipped.',
      'E. Both activities will run simultaneously.',
      'F. Both activities will be skipped.'
    ],
    correct_answer: 'C',
    explanation: 'When an activity in a pipeline succeeds, only the activities connected with "On Success" will execute. The Copy activity is set to run "On Failure", so it will be skipped when the initial activity succeeds. The stored procedure is set to run "On Success", so it will execute. This is standard pipeline conditional execution behavior.',
    category: 'Data Pipeline',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_33',
    question: 'You have a Fabric workspace that contains an eventstream named Eventstream1. Eventstream1 processes data from a thermal sensor by using event stream processing, and then stores the data in a lakehouse. You need to modify Eventstream1 to include the standard deviation of the temperature. Which transform operator should you include in the Eventstream1 logic?',
    type: 'mcq',
    options: [
      'A. Expand',
      'B. Group by',
      'C. Union',
      'D. Aggregate'
    ],
    correct_answer: 'B',
    explanation: 'To calculate standard deviation in an eventstream, you need to use the Group by operator with an aggregation function. The Group by operator allows you to group events by a key and apply aggregate functions like STDEV (standard deviation), AVG, SUM, etc. The Aggregate operator in eventstreams is used within a Group by context. Expand is for arrays, Union combines streams.',
    category: 'Real-Time Intelligence',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_34',
    question: 'You have an Azure event hub. Each event contains the following fields: BikepointID, Street, Neighbourhood, Latitude, Longitude, No_Bikes, No_Empty_Docks. You need to ingest the events. The solution must only retain events that have a Neighbourhood value of Chelsea, and then store the retained events in a Fabric lakehouse. What should you use?',
    type: 'mcq',
    options: [
      'A. a KQL queryset',
      'B. an eventstream',
      'C. a streaming dataset',
      'D. Apache Spark Structured Streaming'
    ],
    correct_answer: 'B',
    explanation: 'An eventstream in Fabric is designed to ingest streaming data from sources like Azure Event Hubs, apply transformations (including filtering by Neighbourhood = "Chelsea"), and output to destinations like a lakehouse. Eventstreams provide a no-code/low-code experience for building real-time data pipelines with filtering capabilities. KQL querysets query existing data, streaming datasets are for Power BI, and Spark Structured Streaming requires more coding.',
    category: 'Real-Time Intelligence',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_35',
    question: 'You have a Fabric workspace that contains a lakehouse named Lakehouse1. In an external data source, you have data files that are 500 GB each. A new file is added every day. You need to ingest the data into Lakehouse1 without applying any transformations. The solution must meet the following requirements: Trigger the process when a new file is added. Provide the highest throughput. Which type of item should you use to ingest the data?',
    type: 'mcq',
    options: [
      'A. Eventstream',
      'B. Dataflow Gen2',
      'C. Notebook',
      'D. Data pipeline'
    ],
    correct_answer: 'D',
    explanation: 'A data pipeline with the Copy Data activity provides the highest throughput for moving large files (500 GB) without transformation. Data pipelines support event-based triggers that can detect when new files are added to storage. The Copy Data activity is optimized for high-throughput data movement and can leverage parallel copying. Eventstreams are for streaming data, Dataflow Gen2 applies transformations, and notebooks require more custom code.',
    category: 'Data Pipeline',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_36',
    question: 'You have a Fabric workspace that contains an eventhouse and a KQL database named Database1. Database1 has a table named Table1 with an update policy named Policy1 that sends data to Table2. The following changes were made to Table1: An additional element named temperature was added to the StreamData column. The data type of the Timestamp column was changed. Which records will successfully load from Table1 to Table2?',
    type: 'mcq',
    options: [
      'A. Only records with the original schema',
      'B. Only records with the new temperature element',
      'C. Records where the Timestamp data type is compatible with the target schema',
      'D. All records regardless of schema changes'
    ],
    correct_answer: 'C',
    explanation: 'Update policies in KQL databases apply transformations during data ingestion. When schema changes occur, records will only load successfully if they are compatible with the target table schema. Adding a new element to a dynamic column (StreamData) is generally compatible, but changing the data type of a column like Timestamp may cause failures if the new type is incompatible with the target. Records with compatible data types will load successfully.',
    category: 'Real-Time Intelligence',
    difficulty: 'hard',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_37',
    question: 'You are developing a data pipeline named Pipeline1. You need to add a Copy data activity that will copy data from a Snowflake data source to a Fabric warehouse. What should you configure?',
    type: 'mcq',
    options: [
      'A. Degree of copy parallelism',
      'B. Fault tolerance',
      'C. Enable staging',
      'D. Enable logging'
    ],
    correct_answer: 'C',
    explanation: 'When copying data from Snowflake to a Fabric warehouse, you must enable staging. Snowflake requires an intermediate staging location (like Azure Blob Storage or ADLS Gen2) to export data before it can be loaded into the destination. This is because Snowflake uses its own proprietary format and requires staging for data export. Parallel copy, fault tolerance, and logging are optional settings.',
    category: 'Data Pipeline',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_38',
    question: 'You have a KQL database that contains two tables named Stream and Reference. Both tables contain millions of rows. You have a KQL query that joins the tables. You need to reduce how long it takes to run the query. Which approach would improve performance?',
    type: 'mcq',
    options: [
      'A. Change the join type to kind=outer',
      'B. Change project to extend',
      'C. Move the filter to run before the join',
      'D. Add the make_list() function to the output columns'
    ],
    correct_answer: 'C',
    explanation: 'Moving filters to run before a join significantly improves query performance by reducing the number of rows that need to be joined. This is a fundamental query optimization technique called "predicate pushdown" - filter early to reduce data volume. Changing to outer join would process more rows, extend is for adding columns (not performance), and make_list() is an aggregation function that doesn\'t improve join performance.',
    category: 'Real-Time Intelligence',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_39',
    question: 'You are implementing a medallion architecture in a Fabric lakehouse. You plan to create a dimension table that will contain the following columns: ID, CustomerCode, CustomerName, CustomerAddress, CustomerLocation, ValidFrom, ValidTo. You need to ensure that the table supports the analysis of historical sales data by customer location at the time of each sale. Which type of slowly changing dimension (SCD) should you use?',
    type: 'mcq',
    options: [
      'A. Type 2',
      'B. Type 0',
      'C. Type 1',
      'D. Type 3'
    ],
    correct_answer: 'A',
    explanation: 'SCD Type 2 is the correct choice when you need to track historical changes and analyze data at the time of each transaction. The presence of ValidFrom and ValidTo columns indicates a Type 2 implementation which maintains full history by creating new rows for each change. Type 0 retains original values (no updates), Type 1 overwrites (no history), and Type 3 only tracks limited history (previous and current).',
    category: 'Lakehouse',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_40',
    question: 'You have a Fabric workspace that contains an eventstream named EventStream1. EventStream1 outputs events to a table named Table1 in a lakehouse. The streaming data is sourced from motorway sensors and represents the speed of cars. You need to add a transformation to EventStream1 to average the car speeds. The speeds must be grouped by non-overlapping and contiguous time intervals of one minute. Each event must belong to exactly one window. Which windowing function should you use?',
    type: 'mcq',
    options: [
      'A. sliding',
      'B. hopping',
      'C. tumbling',
      'D. session'
    ],
    correct_answer: 'C',
    explanation: 'A tumbling window is the correct choice for non-overlapping, contiguous time intervals where each event belongs to exactly one window. Tumbling windows have a fixed size (one minute) with no overlap. Sliding windows overlap, hopping windows can overlap or have gaps, and session windows are based on activity gaps rather than fixed time intervals.',
    category: 'Real-Time Intelligence',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_41',
    question: 'You have a Fabric warehouse named DW1 that contains a Type 2 slowly changing dimension (SCD) dimension table named DimCustomer. DimCustomer contains 100 columns and 20 million rows. The columns are of various data types, including int, varchar, date, and varbinary. You need to identify incoming changes to the table and update the records when there is a change. The solution must minimize resource consumption. What should you use to identify changes to attributes?',
    type: 'mcq',
    options: [
      'A. a hash function to compare the attributes in the source table',
      'B. a direct attributes comparison across the attributes in the DimCustomer table',
      'C. a direct attributes comparison for the attributes in the source table',
      'D. a hash function to compare the attributes in the DimCustomer table'
    ],
    correct_answer: 'A',
    explanation: 'Using a hash function on the source table attributes is the most efficient way to detect changes when dealing with many columns. You compute a hash of the relevant columns in the source, then compare it to a stored hash in the dimension table. This reduces the comparison to a single value instead of comparing 100 individual columns, significantly minimizing resource consumption. Direct column-by-column comparison would be much more expensive.',
    category: 'Data Warehouse',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_42',
    question: 'You have an Azure SQL database named DB1. In a Fabric workspace, you deploy an eventstream named EventStreamDB1 to stream record changes from DB1 into a lakehouse. You discover that events are NOT being propagated to EventStreamDB1. You need to ensure that the events are propagated to EventStreamDB1. What should you do?',
    type: 'mcq',
    options: [
      'A. Create a read-only replica of DB1.',
      'B. Create an Azure Stream Analytics job.',
      'C. Enable Extended Events for DB1.',
      'D. Enable change data capture (CDC) for DB1.'
    ],
    correct_answer: 'D',
    explanation: 'To stream record changes from an Azure SQL database to a Fabric eventstream, you must enable Change Data Capture (CDC) on the source database. CDC tracks INSERT, UPDATE, and DELETE operations on tables and makes the change data available for consumption. Without CDC enabled, the database doesn\'t capture or expose change events for streaming.',
    category: 'Real-Time Intelligence',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_43',
    question: 'You have a Fabric workspace that contains a lakehouse named Lakehouse1. Lakehouse1 contains a Delta table named Table1. You analyze Table1 and discover that Table1 contains 2,000 Parquet files of 1 MB each. You need to minimize how long it takes to query Table1. What should you do?',
    type: 'mcq',
    options: [
      'A. Disable V-Order and run the OPTIMIZE command.',
      'B. Disable V-Order and run the VACUUM command.',
      'C. Run the OPTIMIZE and VACUUM commands.',
      'D. Enable V-Order only.'
    ],
    correct_answer: 'C',
    explanation: 'With 2,000 small files (1 MB each), the table suffers from the "small file problem" which degrades query performance. Running OPTIMIZE will compact these small files into larger ones (typically 1 GB target size). Running VACUUM afterward will clean up the old small files that are no longer referenced. V-Order is a compression optimization that helps with read performance but doesn\'t address the file fragmentation issue.',
    category: 'Lakehouse',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_44',
    question: 'You have a Fabric workspace that contains a warehouse named Warehouse1. Data is loaded daily into Warehouse1 by using data pipelines and stored procedures. You discover that the daily data load takes longer than expected. You need to monitor Warehouse1 to identify the names of users that are actively running queries. Which view should you use?',
    type: 'mcq',
    options: [
      'A. sys.dm_exec_connections',
      'B. sys.dm_exec_requests',
      'C. queryinsights.long_running_queries',
      'D. queryinsights.frequently_run_queries',
      'E. sys.dm_exec_sessions'
    ],
    correct_answer: 'E',
    explanation: 'sys.dm_exec_sessions provides information about active sessions including the login name (username) of users connected to the warehouse. This DMV shows who is currently connected and their session information. sys.dm_exec_requests shows active requests but with less user detail, sys.dm_exec_connections shows connection info, and queryinsights views show historical query patterns rather than active users.',
    category: 'Monitoring',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_45',
    question: 'You have a Fabric workspace that contains an eventstream named EventStream1. EventStream1 outputs events to a table in a lakehouse. You need to remove files that are older than seven days and are no longer in use. Which command should you run?',
    type: 'mcq',
    options: [
      'A. VACUUM',
      'B. COMPUTE STATS',
      'C. OPTIMIZE',
      'D. CLONE'
    ],
    correct_answer: 'A',
    explanation: 'The VACUUM command removes files that are no longer referenced by the Delta table\'s transaction log and are older than the retention threshold. By default, VACUUM retains files for 7 days, but you can specify a different retention period. OPTIMIZE compacts files but doesn\'t remove them, COMPUTE STATS updates statistics, and CLONE creates a copy of the table.',
    category: 'Lakehouse',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_46',
    question: 'You have a Fabric warehouse named DW1 that loads data by using a data pipeline named Pipeline1. Pipeline1 uses a Copy data activity with a dynamic SQL source. Pipeline1 is scheduled to run every 15 minutes. You discover that Pipeline1 keeps failing. You need to identify which SQL query was executed when the pipeline failed. What should you do?',
    type: 'mcq',
    options: [
      'A. From Monitoring hub, select the latest failed run of Pipeline1, and then view the output JSON.',
      'B. From Monitoring hub, select the latest failed run of Pipeline1, and then view the input JSON.',
      'C. From Real-time hub, select Fabric events, and then review the details of Microsoft.Fabric.ItemReadFailed.',
      'D. From Real-time hub, select Fabric events, and then review the details of Microsoft.Fabric.ItemUpdateFailed.'
    ],
    correct_answer: 'B',
    explanation: 'The input JSON of a Copy data activity contains the actual SQL query that was executed (including any dynamically generated queries). When troubleshooting a failed pipeline with a dynamic SQL source, viewing the input JSON shows the exact query that was attempted. The output JSON shows results/errors but not the input query. Real-time hub events provide high-level event notifications, not detailed query information.',
    category: 'Monitoring',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_47',
    question: 'You have a Fabric notebook named Notebook1 that has been executing successfully for the last week. During the last run, Notebook1 executed nine jobs. You need to view the jobs in a timeline chart. What should you use?',
    type: 'mcq',
    options: [
      'A. Real-Time hub',
      'B. Monitoring hub',
      'C. the job history from the application run',
      'D. Spark History Server',
      'E. the run series from the details of the application run'
    ],
    correct_answer: 'E',
    explanation: 'The run series view in the application run details provides a timeline chart visualization of Spark jobs, showing when each job started and completed, and their relationship to each other. This gives you a visual representation of the job execution timeline. Spark History Server provides detailed logs but not the same timeline visualization. Monitoring hub shows pipeline-level information.',
    category: 'Monitoring',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_48',
    question: 'You have a Fabric workspace that contains a warehouse named Warehouse1. While monitoring Warehouse1, you discover that query performance has degraded during the last 60 minutes. You need to isolate all the queries that were run during the last 60 minutes. The results must include the username of the users that submitted the queries and the query statements. What should you use?',
    type: 'mcq',
    options: [
      'A. the Microsoft Fabric Capacity Metrics app',
      'B. views from the queryinsights schema',
      'C. Query activity in Monitoring hub',
      'D. the sys.dm_exec_requests dynamic management view'
    ],
    correct_answer: 'B',
    explanation: 'The queryinsights schema in Fabric warehouses contains views like queryinsights.exec_requests_history that store historical query information including the user who submitted the query and the query text. This allows you to analyze queries from the last 60 minutes. The Capacity Metrics app shows capacity-level metrics, sys.dm_exec_requests shows only currently running queries, and Monitoring hub doesn\'t provide query-level detail.',
    category: 'Monitoring',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_49',
    question: 'You have a Fabric workspace that contains a semantic model named Model1. You need to monitor the refresh history of Model1 and visualize the refresh history in a chart. What should you use?',
    type: 'mcq',
    options: [
      'A. the refresh history from the settings of Model1',
      'B. a notebook',
      'C. a Dataflow Gen2 dataflow',
      'D. a data pipeline'
    ],
    correct_answer: 'B',
    explanation: 'A notebook with semantic link can programmatically access the refresh history of a semantic model and visualize it using libraries like matplotlib or plotly. The refresh history in Model1 settings shows the history but doesn\'t provide charting capabilities. Notebooks with the sempy library can query refresh history via the Power BI REST API and create custom visualizations.',
    category: 'Monitoring',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
  {
    id: 'dp700_50',
    question: 'You have a Fabric workspace that contains a write-intensive warehouse named DW1. DW1 stores staging tables that are used to load a dimensional model. The tables are often read once, dropped, and then recreated to process new data. You need to minimize the load time of DW1. What should you do?',
    type: 'mcq',
    options: [
      'A. Enable V-Order.',
      'B. Create statistics.',
      'C. Drop statistics.',
      'D. Disable V-Order.'
    ],
    correct_answer: 'D',
    explanation: 'V-Order is a write-time optimization that organizes data for optimal read performance, but it adds overhead during data loading. For staging tables that are write-intensive, read once, and then dropped, disabling V-Order will improve load times since the read optimization isn\'t needed. The tables are temporary and don\'t benefit from the read optimization that V-Order provides.',
    category: 'Data Warehouse',
    difficulty: 'medium',
    exam_type: 'DP-700'
  },
];
