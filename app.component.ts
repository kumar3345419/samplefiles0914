import { Component, ViewChild } from '@angular/core';
import { FileUtil } from './file.util';
import { Constants } from './file.constants';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('fileImportInput')
  fileImportInput: any;
  isCSVFile:any='Y';
  csvHeaders: any;
  csvRecords: any;
  selectedCompanyName: any;
  sourceFieldHeadersExist:any;
  IsfixedLengthPosition:any='N';
  result: any;
  isCompanySelected: any ;
  selectedDomain: any;
  news:any;
  localUrl:any;
  data = [];
  selectedHealthPlan:any;
  healthPlanDetailsResult:any;
  isSourceFieldsFound:any;
  selectedHealthPlanDetails=new Array(); 
  addFlag:any='N';
  healthPlanDetails:any;
  ruleDetails:any;
  selectedRowDetails:any;
  selectedRowDetailsLength:any
  healthPlanDetailsArr=new Array();
  tempHealthPlanDetailsArr=new Array();
  tempDomainDetails= new Array();
  domainDetails= new Array();
  addHeaderValues:any;
  idCount:number  = 0;
  dynamicRows:any = [] 
  deleteFlag:any;
  isFileLoaded:boolean = false;  

  constructor(private _router: Router,
    private _fileUtil: FileUtil, private httpClient: HttpClient
  ) { 
  
  }

  delete(id:any){
    for(var i=0; i<this.dynamicRows.length; i++){
      var obj = this.dynamicRows[i];
      if(obj.id == id){
        this.dynamicRows.splice(i,1)
      }
    }
    this.deleteFlag='Y'

    }
  

  add(){

    this.idCount++;
    if(this.isSourceFieldsFound =='N'){
      if (this.dynamicRows.length == 0){
        this.dynamicRows.push({
            'id': this.idCount,
            'sourceFieldName':'',
            'dataTypes':'',
            'nullable':'',
            'startPosition':'',
            'endPosition':'',
            'showFileLoad':true
        })
      } else {
        this.dynamicRows.push({
          'id': this.idCount,
          'sourceFieldName':'',
          'dataTypes':'',
          'nullable':'',
          'startPosition':'',
          'endPosition':''
        })
      }
    } else {
      this.dynamicRows.push({
        'id': this.idCount,
        'sourceFieldName':'',
        'dataTypes':'',
        'nullable':'',
        'startPosition':'',
        'endPosition':''
      })
    }
   
    this.addFlag='Y';   

  }


  save(){
    this.selectedRowDetails = [];
   

    this.dynamicRows.forEach((element:any) => {
      let tempObj = {
        'Col': element.sourceFieldName,
        'dtype': element.dataTypes,
        'nullable': element.nullable
      }
      this.selectedRowDetails.push(tempObj);
    });
    let obj = {
      'client name': 'uhc',
      'domains':'claims',
      'newFields': this.dynamicRows
    };
    console.log('after save ', obj);
    this.hideAndClearDynamicRows();
  }
  
  
  update(){
    let obj = {
      'client name': 'uhc',
      'domains':'claims',
      'newFields': this.selectedRowDetails
    };

    console.log('update() ', obj);
  }
  

  hideAndClearDynamicRows(){  
        this.addFlag = 'N';
        this.dynamicRows = [];
  }


  ngOnInit() {  

    
  }
  

  // METHOD CALLED WHEN CSV FILE IS IMPORTED
  fileChangeListener($event: any): void {
    

    var text = [];
    var files = $event.srcElement.files;

    if (Constants.validateHeaderAndRecordLengthFlag) {
      if (!this._fileUtil.isCSVFile(files[0])) {
        alert("Please import valid .csv file.");
        this.fileReset();
        this.isCSVFile=='N';
        console.log(" this.isCSVFil", this.isCSVFile )
        
      }
    }

    if (this._fileUtil.isCSVFile(files[0])) {

    var input = $event.target;
    var reader = new FileReader();
    reader.readAsText(input.files[0]);

    reader.onload = (data) => {
      let csvData = reader.result;
      let csvRecordsArray = csvData?.toString().split(/\r\n|\n/);

      var headerLength = -1;
      if (Constants.isHeaderPresentFlag) {
        let headersRow = this._fileUtil.getHeaderArray(csvRecordsArray, Constants.tokenDelimeter);
        headerLength = headersRow.length;
      }

      this.csvRecords = this._fileUtil.getDataRecordsArrayFromCSVFile(csvRecordsArray,
        headerLength, Constants.validateHeaderAndRecordLengthFlag, Constants.tokenDelimeter);
      this.csvHeaders = this.csvRecords[0];
      
      if (this.csvRecords == null) {
        //If control reached here it means csv file contains error, reset file.
        this.fileReset();
      }

      this.isFileLoaded = true;
    } 
  }

   
  };

  fileReset() {
    this.fileImportInput.nativeElement.value = "";
    this.csvRecords = [];
    this.isCSVFile=='N';
  }

  search()
  {
   // this.addFlag='N'; 
    //this.selectedHealthPlanDetails='[ { "id": 4,  "dom_desc": "claims", "hlth_pln_desc": "uhc"}, {  "id": 5, "dom_desc": "claimsdiag",     "hlth_pln_desc": "fidelis"}]'

this.selectedHealthPlanDetails[0]={id:0,dom_desc:'claims', hlth_pln_desc:'uhc'}
this.selectedHealthPlanDetails[1]={id:1,dom_desc:'member', hlth_pln_desc:'fidelis'}




console.log("this.selectedHealthPlanDetails"+this.selectedHealthPlanDetails)
if(this.selectedHealthPlanDetails ==null || this.selectedHealthPlanDetails == undefined)
{
this.isSourceFieldsFound='N'
console.log("this.isSourceFieldsFound"+this.isSourceFieldsFound)

}
else
{

      
     
      //this.selectedRowDetails=JSON.parse(response["fl_vld_schm"]);
      this.selectedRowDetails='[ {"Col": "MemberID", "dtype": "str", "nullable": "N"}, {"Col": "MemberName", "dtype": "str", "nullable": "N"}, {"Col": "AuthCaseID", "dtype": "str", "nullable": "N"}, {"Col": "StartDate", "dtype": "datetime", "nullable": "Y"}, {"Col": "EndDate", "dtype": "datetime", "nullable": "Y"}, {"Col": "FacProvID", "dtype": "str", "nullable": "Y"}, {"Col": "FacProvName", "dtype": "str", "nullable": "Y"}, {"Col": "SvcProvName", "dtype": "str", "nullable": "Y"}, {"Col": "PrimProcCD", "dtype": "str", "nullable": "Y"}, {"Col": "ProcCodeList", "dtype": "str", "nullable": "Y"}, {"Col": "PrimDiagCD", "dtype": "str", "nullable": "Y"}, {"Col": "PrimDiagDesc", "dtype": "str", "nullable": "Y"}, {"Col": "AuthType", "dtype": "str", "nullable": "Y"}, {"Col": "NoteInitBedDecnRsn", "dtype": "str", "nullable": "Y"}]';
      this.selectedRowDetails=JSON.parse(this.selectedRowDetails);
      if (this.selectedRowDetails!=null)
      {
        this.isSourceFieldsFound='Y';
      for (let x in this.selectedRowDetails) {
      
        if(this.selectedRowDetails[x].position!=null)
        {
          this.IsfixedLengthPosition='Y';
          break;
        } 
        else
        {
          this.IsfixedLengthPosition='N'
          break;
        }
  
        }     
      }
      else
      {
        this.isSourceFieldsFound='N';
       
      }
      /* Test file upload functionality */
      console.log("this.selectedHealthPlanDetails[0].dom_desc",this.selectedHealthPlanDetails[0].dom_desc)
      if (this.selectedCompanyName=='morc')
      {
      this.selectedRowDetails=''
     this.isSourceFieldsFound='N';
      }
            /* Test file upload functionality */
    
      console.log("this.selectedRowDetails", JSON.parse(JSON.stringify(this.selectedRowDetails)));  
    
  }
  }
}